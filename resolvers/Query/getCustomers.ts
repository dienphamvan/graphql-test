import { PrismaClient, Customer } from "@prisma/client";
import { getPresignedUrl } from "../../storage/s3";

export const handler = async () => {
  const prisma = new PrismaClient();
  const customers = await prisma.customer.findMany();

  const url = await getPresignedUrl("cat-images/white cat/cat-image.jpg");
  console.log(url);

  return customers;
};
