import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function insertHospital(name: string, phone: string, address_id: number) {
  const hospital = await prisma.hospital.create({
    data: {
      name, 
      phone,
      address_id
    },

    select: {
      name: true
    }
  });

  return hospital;
}

export async function getHospitals() {
  const hospitals = await prisma.hospital.findMany();

  return hospitals;
}