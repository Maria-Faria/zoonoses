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

export async function updateHospital(id: number, phone: string, address_id: number) {
  const hospital = await prisma.hospital.update({
    where: {
      id
    },
    data: {
      phone,
      address_id
    }
    
  });

  return hospital;
}

export async function getHospitals() {
  const hospitals = await prisma.hospital.findMany();

  return hospitals;
}

export async function deleteHospital(id: number) {
  const hospital = await prisma.hospital.delete({
    where: {
      id
    }
  });

  return hospital;
}

export async function getHospitalByName(name: string) {
  const hospital = await prisma.hospital.findFirst({
    where: {
      name: {
        contains: name,
        mode: "insensitive"
      }},
    select: {
      id: true,
      name: true,
      phone: true,
      address_id: true
    }
  });

  return hospital;
}