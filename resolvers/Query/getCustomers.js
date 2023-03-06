import { PrismaClient } from "@prisma/client";

export const handler = async () => {
  const prisma = new PrismaClient();
  const customers = await prisma.customer.findMany();

  return customers;
};

// Make a change to get customers
