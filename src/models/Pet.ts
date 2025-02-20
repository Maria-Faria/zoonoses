import {  PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getPetByMicrochip(microchip: string) {
  const pet = await prisma.pets.findUnique({
    where: { microchip },
    select: {
      public_id: true
    }
  });

  return pet;
}

export async function createPet(age: number, size_pet: "pequeno" | "medio" | "grande", input_date: Date, specie: string, breed: string, color: string, weight: number, pet_gender: "macho" | "femea", plate: number, microchip: string, id_tutor: string, input_type: "recolhido" | "entregue" | "abandonado") {
  console.log(age, size_pet, input_date, specie, breed, color, weight, pet_gender, plate, microchip, id_tutor, input_type)
  const pet = await prisma.pets.create({
    data: {
      age,
      size_pet,
      input_date,
      specie,
      breed,
      color,
      weight,
      pet_gender,
      plate,
      microchip,
      id_tutor,
      input_type
    },
    select: {
      public_id: true
    }
  });

  return pet;
}