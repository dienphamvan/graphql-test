import { writeFileSync } from "fs-extra";
import path from "path";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { Resolvers } from "./resolvers-types";
import { mergeResolvers } from "./utils/merge-resolvers";
import { print } from "graphql";

export const createMergedSchema = async () => {
  const typesArray = loadFilesSync("./graphql", {
    extensions: ["graphql"],
    recursive: true,
  });
  const typeDefs = mergeTypeDefs(typesArray);
  const printedTypeDefs = print(typeDefs);

  writeFileSync(
    path.resolve(__dirname, "./graphql/schema.graphql"),
    printedTypeDefs
  );

  const resolversMerged: Resolvers = await mergeResolvers();

  const schema = {
    typeDefs: typeDefs,
    resolvers: resolversMerged,
  };

  return schema;
};
