import {  PrismaClient } from "@prisma/client";
import { z } from "zod";
import { verifyCPF } from "../middleware/verifyCPF";

const prisma = new PrismaClient();

export interface Tutor {
  public_id?: string;                       
  cpf: string;                             
  name: string;   
  phone: string;                 
  address: number;                 
  pets?: string[];                          
}

const CPFSchema = z
  .string({
    invalid_type_error: 'The name must be a string.',
    required_error: 'Name required. '
})
  .min(11, "O CPF deve ter pelo menos 11 caracteres.")
  .max(14, "O CPF não pode ter mais de 14 caracteres.")
  .refine((cpf) => verifyCPF(cpf), {
    message: "CPF inválido.",
  });

const tutorSchema = z.object({                        
  name:z.string({
    invalid_type_error: 'The name must be a string.',
    required_error: 'Name required. '
})
.min(3, {message: 'The user name must have at least 3 letters. '})
.max(250, {message: 'The user name must be a maximum of 200 characters.'}),
phone: z.string({
  invalid_type_error: 'The phones must be a string.',
  required_error: 'Phone required.'
})
.min(10, {message: 'The telephone number must have at least 10 digits'})
.max(15, {message: 'The phone must be a maximum of 11 digits.'}),
cpf: CPFSchema,
address: z.number(),
});

export const createTutor = async (tutor: Tutor) => {
  console.log(tutor)
  const result = tutorSchema.safeParse(tutor);  

  if(!result.success) { 
    return {
      success: false,
      error: result.error.format()
    }
  }

  const validatedData = result.data;

  try {

    const tutorCreated = await prisma.tutors.create({
      data: {
        name: validatedData.name,
        cpf: validatedData.cpf,
        phone: validatedData.phone,
        address: validatedData.address,
      },
      select: {
        public_id: true,
      }
    });

    return {
        success: true,
        data: tutorCreated
      }

    } catch (error) {
      console.log("Erro ao criar tutor: ", error);
      return {
        success: false
    }
  }
}

export const verifyCPFInDatabase = async (cpf: string) => {
  const result = await prisma.tutors.findFirst({
    where: {
      cpf
    },
    select: {
      public_id: true,
      name: true,
      phone: true,
      address: true
    }
  });
  return result;
}

export async function getTutorById(id: string) {
  const tutor = await prisma.tutors.findUnique({
    where: {public_id: id},
    select: {
      cpf: true,
      name: true,
      address: true,
      phone: true
    }
  });

  return tutor;
}

export async function updateTutor(tutor_id: string, name: string, phone: string, address: number) {
  const result = await prisma.tutors.update({
    where: {
      public_id: tutor_id
    },
    data: {
      name,
      phone,
      address
    },
    select: {
      public_id: true,
      name: true,
      address: true,
      phone: true
    }
  });

  return result;
}

