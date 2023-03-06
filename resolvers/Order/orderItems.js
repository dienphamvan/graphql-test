import { PrismaClient } from "@prisma/client";

export const handler = (source) => {
  const { id: orderId } = source;

  const prisma = new PrismaClient();
  const orderItems = prisma.orderItem.findMany({ where: { orderId } });
  return orderItems;
};

// Make a change in order item
