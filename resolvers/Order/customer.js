import { PrismaClient } from "@prisma/client";

export const handler = (source) => {
  const { customerId } = source;

  const prisma = new PrismaClient();
  const customer = prisma.customer.findFirst({ where: { id: customerId } });
  return customer;
};
// Make a change in customer
