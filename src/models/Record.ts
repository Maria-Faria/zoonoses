import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function insertRecord(tutor_id: string, pet_id: string, services: string[], price: number) {
  const record = await prisma.records.create({
    data: {
      tutor_id,
      pet_id,
      services,
      price
    },

    select: {
      id: true
    }
  });

  return record;
}