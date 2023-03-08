import glob from "glob";
import path from "path";
const resolversFolder = path.resolve(__dirname, "../resolvers");

export const mergeResolvers = async () => {
  const files = glob.sync("*/*.ts", {
    cwd: resolversFolder,
  });

  const resolvers = {};

  await Promise.all(
    files.map(async (file) => {
      const fileName = path.join(resolversFolder, file);
      const { handler } = await import(fileName);

      if (!handler) return;

      const [type, definition] = file.split("/");
      const [definitionName] = definition.split(".");

      resolvers[type] = {
        ...resolvers[type],
        [definitionName]: handler,
      };
    })
  );

  return resolvers;
};
