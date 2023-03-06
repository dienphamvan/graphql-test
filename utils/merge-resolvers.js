import glob from "glob";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);

const resolversFolder = path.resolve(__dirname, "../resolvers");

export const mergeResolvers = async () => {
  const files = glob.sync("*/*.js", {
    cwd: resolversFolder,
  });

  const resolvers = {};

  await Promise.all(
    files.map(async (file) => {
      const fileName = path.join(resolversFolder, file);
      const { handler } = await import("file://" + fileName);

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
