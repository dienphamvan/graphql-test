import { createSchema } from "graphql-yoga";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers } from "./utils/merge-resolvers.js";
import { Resolvers } from "./resolvers-types";

export const createMergedSchema = async () => {
  const typesArray = loadFilesSync("./graphql", {
    extensions: ["graphql"],
    recursive: true,
  });
  const resolversMerged: Resolvers = await mergeResolvers();

  const schema = createSchema({
    typeDefs: mergeTypeDefs(typesArray),
    resolvers: resolversMerged,
  });

  return schema;
};
