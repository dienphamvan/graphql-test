import { Customer, PrismaClient } from "@prisma/client";
import { getPresignedUrl } from "../../storage/s3";

export const handler = async () => {
  const prisma = new PrismaClient();
  const customers = await prisma.customer.findMany();

  const transformedCustomers = await customers.map(async (customer) => {
    const preSignedUrl = await getPresignedUrl(customer.avatar);
    const transformedCustomer: Customer = {
      ...customer,
      avatar: preSignedUrl,
    };
    return transformedCustomer;
  });

  return transformedCustomers;
};
