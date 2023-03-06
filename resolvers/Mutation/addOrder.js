import { PrismaClient } from "@prisma/client";
import SUBSCRIPTION_TYPE from "../../const/Subscription.js";

export const handler = async (_, { input }, { pubSub }) => {
  const { customerId } = input;

  const prisma = new PrismaClient();
  const newOrder = await prisma.order.create({
    data: {
      customerId,
    },
  });

  pubSub.publish(SUBSCRIPTION_TYPE.newOrder, newOrder);

  return newOrder;
};
