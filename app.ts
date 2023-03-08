import { createSchema, createYoga } from "graphql-yoga";
import { createServer } from "node:http";
import { createMergedSchema } from "./schema";

const bootstrap = async () => {
  const schema = await createMergedSchema();
  const createdSchema = createSchema(schema);

  const yoga = createYoga({ schema: createdSchema });

  const server = createServer(yoga);
  server.listen(4001, () => {
    console.info("Server is running on http://localhost:4001/graphql");
  });
};

bootstrap();
