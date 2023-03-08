import { PrismaClient } from "@prisma/client";
import { Book } from "../../resolvers-types";

export const handler = async (): Promise<Book[]> => {
  const prisma = new PrismaClient();
  const books = await prisma.book.findMany();

  return books;
};
