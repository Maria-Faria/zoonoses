import { createUser, validateUserToCreate } from "../../models/User";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { User } from "../../models/User";

const createUserController = async (req: Request, res: Response): Promise<any> => {
  try {
    const user = req.body;
    const validatedUser = validateUserToCreate(user);

    if(validatedUser?.error) {
      return res.status(400).json({
        error: "Erro ao criar um novo usuário! Verifique os dados!",
        fieldErrors: validatedUser.error.flatten().fieldErrors
      });
    }

    validatedUser.data.password = bcrypt.hashSync(`${validatedUser.data.name.split(" ")[0]}#${validatedUser.data.user_code}`, 10);

    const newUser: User = {
      user_code: validatedUser.data.user_code,
      name: validatedUser.data.name,
      password: validatedUser.data.password
    }

    const result = await createUser(newUser);

    return res.status(200).json(result);

  } catch (error) {
    console.log(error);
  }
};

export default createUserController;