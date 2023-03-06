import { PrismaClient } from "@prisma/client";

export const handler = async (_, { input }) => {
  const { title } = input;

  const prisma = new PrismaClient();
  const newBook = await prisma.book.create({
    data: {
      title,
    },
  });

  return newBook;
};
