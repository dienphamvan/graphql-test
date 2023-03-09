import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import { MutationAddCustomerArgs } from "../../resolvers-types";
import { s3 } from "../../storage/s3";

export const handler = async (_, { input }: MutationAddCustomerArgs) => {
  try {
    const { name, avatar } = input;

    const date = new Date().getTime();
    const fileName = date.toString();

    const file = fs.readFileSync(
      path.resolve(__dirname, "..", "..", "image-test", "cat-image.jpg")
    );

    await s3.putObject(
      {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: fileName,
        Body: file,
        ContentType: "image/jpeg",
      },
      (error, _data) => {
        if (error) throw new Error(error.message);
      }
    );

    const prisma = new PrismaClient();
    const newCustomer = await prisma.customer.create({
      data: {
        name,
        avatar: fileName,
      },
    });

    return newCustomer;
  } catch (error) {
    console.error(error);
  }
};
