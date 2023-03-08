import { PrismaClient } from "@prisma/client";

export const handler = async () => {
  const prisma = new PrismaClient();
  const books = await prisma.book.findMany();

  return books;
};
