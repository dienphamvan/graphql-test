import { PrismaClient } from "@prisma/client";

export const handler = async () => {
  const prisma = new PrismaClient();
  const orders = await prisma.order.findMany();
  return orders;
};
