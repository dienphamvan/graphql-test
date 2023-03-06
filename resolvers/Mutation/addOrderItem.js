import { PrismaClient } from "@prisma/client";

export const handler = async (_, { input }) => {
  const { orderId, bookId } = input;

  const prisma = new PrismaClient();
  const newOrderItem = await prisma.orderItem.create({
    data: {
      orderId,
      bookId,
    },
  });

  return newOrderItem;
};
