import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function insertHospital(name: string, phone: string, email: string | null, address_id: number) {
  const hospital = await prisma.hospital.create({
    data: {
      name, 
      phone,
      email, 
      address_id
    },

    select: {
      name: true
    }
  });

  return hospital;
}