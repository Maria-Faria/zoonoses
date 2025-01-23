import { Request, Response } from "express";
import { getUserByCode } from "../../models/User";
import { validateUserToLogin } from "../../models/User";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";

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
      const tokenData = {
        user_code: userValidated.data.user_code,
        name: userValidated.data.name,
      };

      const tokenKey = "1234567890";
      const tokenOption = {
        subject: userValidated.data.public_id,
        expiresIn: "2h"
      }

      const token = sign(tokenData, tokenKey, tokenOption);
      
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