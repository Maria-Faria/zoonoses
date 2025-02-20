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

export async function getServices() {
  const services = await prisma.services.findMany();

  return services;
}

export async function getServiceByType(type: string) {
  const service = await prisma.services.findUnique({
    where: {
      type
    },
    select: {
      public_id: true
    }
  });

  return service;
}