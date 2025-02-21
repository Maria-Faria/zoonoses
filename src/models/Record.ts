import { PrismaClient } from "@prisma/client";
import { ServiceInterface } from "../controllers/record/createRecord.controller";

const prisma = new PrismaClient();

export async function insertRecord(tutor_id: string, pet_id: string,  price: number) {
  const record = await prisma.records.create({
    data: {
      tutor_id,
      pet_id,
      price
    },

    select: {
      id: true
    }
  });

  return record;
}

export async function insertRecord_service(record_id: number, service_id: string, qtd: number) {
  const record_service = await prisma.services_records.create({
    data: {
      record_id,
      service_id,
      qtd
    },

    select: {
      id: true
    }
  });

  return record_service;
}

export async function getServicesByRecord(record_id: number) {
  const services = await prisma.services_records.findMany({
    where: {
      record_id
    },
    select: {
      service_id: true,
      qtd: true,
    }
  });

  return services;
}

export async function getRecordById(id: number) { 
  const record = await prisma.records.findUnique({
    where:{ id },
    select: {
      id: true,
      tutor_id: true,
      pet_id: true,
      services_records: true,
      price: true
    }
  });

  return record;
}