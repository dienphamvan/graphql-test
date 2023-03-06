export const handler = async (_, __, { prisma }) => {
  const books = await prisma.book.findMany();

  return books;
};

// Make a change in get book
