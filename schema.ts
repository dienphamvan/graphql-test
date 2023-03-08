import { Resolvers } from "./resolvers-types";
import { mergeResolvers } from "./utils/merge-resolvers";
import { readFileSync } from "fs";
import path from "path";

export const createMergedSchema = async () => {
  const typeDefsBuffer = readFileSync(
    path.resolve(__dirname, "graphql", "schema.graphql")
  );
  const typeDefs = typeDefsBuffer.toString();

  const resolversMerged: Resolvers = await mergeResolvers();

  const schema = {
    typeDefs: typeDefs,
    resolvers: resolversMerged,
  };

  return schema;
};
