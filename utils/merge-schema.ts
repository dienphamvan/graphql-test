import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import path from "path";
import { print } from "graphql";
import { writeFileSync } from "fs-extra";

const mergeSchema = () => {
  const graphqlDir = path.resolve(__dirname, "..", "graphql");
  const typesArray = loadFilesSync(graphqlDir, {
    extensions: ["graphql"],
    recursive: true,
  });
  const typeDefs = mergeTypeDefs(typesArray);
  const printedTypeDefs = print(typeDefs);

  writeFileSync(
    path.resolve(__dirname, "..", "graphql", "schema.graphql"),
    printedTypeDefs
  );

  console.log("Write schema file successfully !!!");
};

mergeSchema();
