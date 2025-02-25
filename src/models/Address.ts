import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

export interface Address {
  id?: number;
  cep: string;
  state: string;                          
  city: string;                           
  neighborhood: string;      
  road: string; 
  number: number;
}

export async function insertAddress(cep:string, state: string, city: string, neighborhood: string, road: string, number: string) {
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