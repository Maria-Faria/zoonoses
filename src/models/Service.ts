import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function insertService(type: string, price: number) {
  const service = await prisma.services.create({
    data: {
      type,
      price
    },
    select: {
      type: true,
      price: true
    }
  });

  return service;
}