import { PrismaClient, Order } from "@prisma/client";

export const handler = async (): Promise<Order[]> => {
  const prisma = new PrismaClient();
  const orders = await prisma.order.findMany();
  return orders;
};
