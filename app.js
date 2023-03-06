import { createServer } from "node:http";
import { createYoga, createPubSub } from "graphql-yoga";
import { createMergedSchema } from "./schema.js";
import { PrismaClient } from "@prisma/client";
import { getDirective, MapperKind, mapSchema } from "@graphql-tools/utils";
import { defaultFieldResolver } from "graphql";
import jwt from "jsonwebtoken";

const bootstrap = async () => {
  const pubSub = createPubSub();
  const prisma = new PrismaClient();

  const directivesTransformer = (schema, directiveName) => {
    return mapSchema(schema, {
      [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
        const directive = getDirective(schema, fieldConfig, directiveName);

        const initialResolver = fieldConfig.resolve || defaultFieldResolver;

        if (directive?.[0]) {
          fieldConfig.resolve = async (source, args, context, info) => {
            try {
              const token = context?.req?.headers?.authorization;

              const payload = jwt.verify(token, process.env.SECRET_KEY);

              if (!payload) return [];

              const result = await initialResolver(source, args, context, info);
              return result;
            } catch (error) {
              return [];
            }
          };
        }
      },
    });
  };

  const context = {
    pubSub,
    prisma,
  };

  let schema = await createMergedSchema();
  schema = directivesTransformer(schema, "auth");

  const yoga = createYoga({ schema, context, graphiql: true });

  const server = createServer(yoga);
  server.listen(4001, () => {
    console.info("Server is running on http://localhost:4001/graphql");
  });
};

bootstrap();
