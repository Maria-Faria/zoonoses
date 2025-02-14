import {  PrismaClient } from "@prisma/client";
import { z } from "zod";
import { verifyCPF } from "../middleware/verifyCPF";
import {  Address } from "./Address";

const prisma = new PrismaClient();

export interface Tutor {
  public_id?: string;                       
  cpf: string;                             
  name: string;   
  phones: string[];                 
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
phones: z.array(z.string({
  invalid_type_error: 'The phones must be a string.',
  required_error: 'Phone required.'
})
.min(10, {message: 'The telephone number must have at least 10 digits'})
.max(11, {message: 'The phone must be a maximum of 11 digits.'})),
cpf: CPFSchema,
address: z.number(),
});

export const createTutor = async (tutor: Tutor) => {
  const result = tutorSchema.safeParse(tutor);

  console.log(tutor);
  

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
        phones: validatedData.phones,
        address: validatedData.address,
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
    }
  });
  return result;
}

console.log("Tutor model");