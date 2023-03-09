import "dotenv/config";
import * as AWS from "aws-sdk";
import { createSchema, createYoga } from "graphql-yoga";
import { createServer } from "node:http";
import { createMergedSchema } from "./schema";

const bootstrap = async () => {
  const schema = await createMergedSchema();
  const createdSchema = createSchema(schema);

  const yoga = createYoga({ schema: createdSchema });

  AWS.config.update({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  const server = createServer(yoga);
  server.listen(4001, () => {
    console.info("Server is running on http://localhost:4001/graphql");
  });
};

bootstrap();
