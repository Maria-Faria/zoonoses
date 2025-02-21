import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

export interface Address {
  id?: number;
  state: string;                          
  city: string;                           
  neighborhood: string;      
  road: string; 
  number: number;
}

export async function insertAddress(cep: string, state: string, city: string, neighborhood: string, road: string, number: string) {
  console.log("insertAddress");
  console.log(cep, state, city, neighborhood, road, number);
  const address = await prisma.address.create({
    data: {
      cep,
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

  return {
    success: true,
    data: address
  };
}


export async function getAddress() {
  const address = await prisma.address.findMany();

  return address;
}

export async function getAddressById(id: number) {
  const address = await prisma.address.findUnique({
    where: {
      id
    },
    select: {
      cep: true,
      number: true
    }
  });

  return address;
}

export async function updateAddress(id: number, cep: string, state: string, city: string, neighborhood: string, road: string, number: string) {
  const address = await prisma.address.update({
    where: {
      id
    },
    data: {
      cep,
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