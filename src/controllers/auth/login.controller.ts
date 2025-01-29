import { Request, Response } from "express";
import { getUserByCode, User } from "../../models/User";
import { validateUserToLogin } from "../../models/User";
import bcrypt from "bcrypt";
import { getToken } from "./getToken";

const loginController = async (req: Request, res: Response): Promise<any> => {
  try {
    const { user_code, password } = req.body;
    const user = await getUserByCode(user_code);

    if(!user) {
      return res.status(400).send("Usuário e/ou senha inválidos!");
    }

    const userValidated = validateUserToLogin(user);

    if(userValidated?.error) {
      return res.status(400).json({
        error: "Erro ao logar, verifique os dados!",
        fieldErrors: userValidated.error.flatten().fieldErrors
      });
    }

    const passIsValid = bcrypt.compareSync(password, userValidated.data.password);

    if (passIsValid) {
      const token = await getToken(userValidated.data.user_code, userValidated.data.name, userValidated.data.public_id);
      
      return res.status(200).json({ token });
    
    }else {
      return res.status(400).send("Usuário e/ou senha inválidos!");
    }

  } catch (error) {
    console.log(error);
    return res.status(500).send("Erro no servidor!");
  }
}

export default loginController;