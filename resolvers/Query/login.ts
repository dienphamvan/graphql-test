import { PrismaClient } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import { QueryLoginArgs } from "../../resolvers-types";

export const handler = async (_, args: QueryLoginArgs) => {
  const { email, password } = args;
  const prisma = new PrismaClient();

  const user = await prisma.user.findFirst({ where: { email, password } });
  if (!user) {
    return "Invalid email, password";
  } else {
    const token = jwt.sign({ email }, process.env.SECRET_KEY);
    return token;
  }
};
