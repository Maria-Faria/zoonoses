import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function insertAddress(state: string, city: string, neighborhood: string, road: string, number: string) {
  const address = await prisma.address.create({
    data: {
      state,
      city,
      neighborhood,
      road,
      number
    },

    select: {
      id: true
    }
  });

  return address;
}

export async function getAddress() {
  const address = await prisma.address.findMany();

  return address;
}