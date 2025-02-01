import { PrismaClient } from "@prisma/client";
import { z } from "zod";

export interface User {
  public_id?: string;
  user_code: string;
  name: string;
  email: string;
  admin?: boolean | undefined | null;
  password: string;
}

const prisma = new PrismaClient();

const userSchema = z.object({
  public_id: z.string({ required_error: "Id é obrigatório" }),
  user_code: z.string({ required_error: "Código é obrigatório"}),
  name: z.string({ required_error: "Nome é obrigatório", invalid_type_error: "Nome deve ser uma string" }),
  email: z.string({ required_error: "Email é obrigatório", invalid_type_error: "Email deve ser uma string" }),
  password: z.string({ required_error: "Senha é obrigatória", invalid_type_error: "Senha deve ser uma string" }),
  admin: z.boolean().nullable()
});

// CREATE 
export const validateUserToCreate = (user: User) => {
  const partialUserSchema = userSchema.partial({
    public_id: true,
    password: true
  });

  return partialUserSchema.safeParse(user);
};

//LOGIN
export const validateUserToLogin = (user: User) => {
  const partialUserSchema = userSchema.partial({
    public_id: true,
    name: true,
    admin: true
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
      email: true,
      admin: true
    }
  });

  return result;
}

export async function getUserByCode(user_code: string) {
  const user = await prisma.users.findUnique({
    where: { user_code: user_code},
    select: {
      public_id: true,
      user_code: true,
      name: true,
      email: true,
      password: true,
      admin: true
    }
  });

  return user;
}

export async function getUserById(public_id: string) {
  const user = await prisma.users.findUnique({
    where: { public_id },
    select: {
      public_id: true,
      user_code: true,
      name: true,
      admin: true
    }
  });

  return user;
}
