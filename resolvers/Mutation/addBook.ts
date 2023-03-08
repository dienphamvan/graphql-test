import { PrismaClient } from "@prisma/client";
import { Book, MutationAddBookArgs } from "../../resolvers-types";

export const handler = async (
  _,
  { input }: MutationAddBookArgs
): Promise<Book> => {
  const { title } = input;

  const prisma = new PrismaClient();
  const newBook = await prisma.book.create({
    data: {
      title,
    },
  });

  return newBook;
};
