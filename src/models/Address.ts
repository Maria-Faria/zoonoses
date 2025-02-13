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

export const createAddress = async (state: string, city: string, neighborhood: string, road: string, number: string) => {

  const result = await prisma.address.create({
    data: {
      state, city, neighborhood, road, number
    },

    select: {
      id: true
    }
  });

  if(result) {
    return {data: result, success: true};
  }
};
