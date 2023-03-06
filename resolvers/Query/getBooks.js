export const handler = async (_, __, { prisma }) => {
  const books = await prisma.book.findMany();

  return books;
};
