import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

export const handler = async (_, args) => {
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
