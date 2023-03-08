import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { Resolvers } from "./resolvers-types";
import { mergeResolvers } from "./utils/merge-resolvers";

export const createMergedSchema = async () => {
  const typesArray = loadFilesSync("./graphql", {
    extensions: ["graphql"],
    recursive: true,
  });
  const resolversMerged: Resolvers = await mergeResolvers();

  const schema = {
    typeDefs: mergeTypeDefs(typesArray),
    resolvers: resolversMerged,
  };

  return schema;
};
