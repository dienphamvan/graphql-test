import { PrismaClient } from "@prisma/client";

export const handler = (source) => {
  const { bookId } = source;
  const prisma = new PrismaClient();
  const book = prisma.book.findFirst({ where: { id: bookId } });
  return book;
};

// Make a change in book
