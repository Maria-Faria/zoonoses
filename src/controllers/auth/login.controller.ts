import { Request, Response } from "express";
import { getUserByCode, User } from "../../models/User";
import { validateUserToLogin } from "../../models/User";
import bcrypt from "bcrypt";
import { getToken } from "./config/getToken";
import { insertToken } from "../../models/Auth";

const loginController = async (req: Request, res: Response): Promise<any> => {  
  try {
    const { user_code, password } = req.body;
    const user = await getUserByCode(user_code);

    if(!user) {
      return res.status(400).json({error: "Usuário e/ou senha inválidos!"});
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
      const accessToken = await getToken(userValidated.data.user_code, userValidated.data.name, userValidated.data.public_id, "5m", process.env.ACCESS_TOKEN_KEY || "123456");
      const refreshToken = await getToken(userValidated.data.user_code, userValidated.data.name, userValidated.data.public_id, "1d", process.env.REFRESH_TOKEN_KEY || "785632");
      
      await insertToken(user.public_id, refreshToken);

      return res.status(200).json({ accessToken });
    
    }else {
      return res.status(400).json({error: "Usuário e/ou senha inválidos!"});
    }

  } catch (error) {
    return res.status(500).json({error: "Erro no servidor!"});
  }
}

export default loginController;