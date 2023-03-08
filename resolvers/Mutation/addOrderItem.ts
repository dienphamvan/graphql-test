import { PrismaClient } from "@prisma/client";
import { Contains, Length, validate } from "class-validator";

// class OrderItem {
//   @Length(10)
//   orderId: string | undefined;

//   @Contains("#")
//   bookId: string | undefined;

//   constructor(bookId, orderId) {
//     this.bookId = bookId;
//     this.orderId = orderId;
//   }
// }

export const handler = async (_, { input }) => {
  console.log(input);
  const { orderId, bookId } = input;

  // const orderItem = new OrderItem(bookId, orderId);
  // await validate(orderItem);

  // const errors = await validate(orderItem);
  // console.log(errors);

  const prisma = new PrismaClient();
  const newOrderItem = await prisma.orderItem.create({
    data: {
      orderId,
      bookId,
    },
  });

  return newOrderItem;
};
