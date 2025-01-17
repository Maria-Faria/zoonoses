import { PrismaClient } from "@prisma/client";
import { z } from "zod";

export interface User {
  public_id?: string;
  user_code: number;
  name: string;
  admin?: boolean;
  password: string;
}

const prisma = new PrismaClient();

const userSchema = z.object({
  public_id: z.string({ required_error: "Id é obrigatório" }),
  user_code: z.number({ required_error: "Código é obrigatório", invalid_type_error: "Código deve ser um número" }).positive({ message: "O código deve ser um número positivo" }),
  name: z.string({ required_error: "Nome é obrigatório", invalid_type_error: "Nome deve ser uma string" }),
  admin: z.boolean({ required_error: "Admin é obrigatório", invalid_type_error: "Admin deve ser um booleano" }),
  password: z.string({ required_error: "Senha é obrigatória", invalid_type_error: "Senha deve ser uma string" })
});

// CREATE 
export const validateUserToCreate = (user: User) => {
  const partialUserSchema = userSchema.partial({
    public_id: true,
    admin: true,
    password: true
  });

  return partialUserSchema.safeParse(user);
}
export async function createUser(user: User) {
  const result = await prisma.users.create({
    data: user,
    select: {
      public_id: true,
      user_code: true,
      name: true,
      admin: true
    }
  });

  return result;
}