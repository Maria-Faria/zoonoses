import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface HospitalInterface {
  id: number,
  name: string,
  phone: string,
  address_id: number
}

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

export async function getHospitalByName(name: string) {
  const hospital = await prisma.hospital.findFirst({
    where: {
      name: {
        contains: name,
        mode: "insensitive"
      }},
    select: {
      name: true,
      phone: true,
      address_id: true
    }
  });

  return hospital;
}