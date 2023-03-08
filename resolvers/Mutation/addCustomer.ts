export const handler = async (_, { input }, { prisma }) => {
  const { name } = input;
  const newCustomer = await prisma.customer.create({
    data: {
      name,
    },
  });

  return newCustomer;
};
