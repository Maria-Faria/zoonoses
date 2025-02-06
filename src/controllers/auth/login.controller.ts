import { Request, Response } from "express";
import { getUserByCode, User } from "../../models/User";
import { validateUserToLogin } from "../../models/User";
import bcrypt from "bcrypt";
import { getToken } from "./config/getToken";
import { deleteUserToken, deleteUserTokenById, getUserToken, insertToken } from "../../models/Auth";

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

    const initialPass = `${userValidated.data.name?.split(" ")[0]}#${userValidated.data.user_code}`;
    const passIsValid = bcrypt.compareSync(password, userValidated.data.password);

    if (passIsValid) {

      if(bcrypt.compareSync(initialPass, userValidated.data.password)) {
        res.status(200).json({message: "Primeiro login"});
      
      }else {

        const accessToken = await getToken(userValidated.data.user_code, userValidated.data.name, userValidated.data.public_id, "30m", process.env.ACCESS_TOKEN_KEY as string);
        const refreshToken = await getToken(userValidated.data.user_code, userValidated.data.name, userValidated.data.public_id, "1d", process.env.REFRESH_TOKEN_KEY as string);
        
        const token = await getUserToken(user.public_id);
  
        if(token) {
          await deleteUserTokenById(user.public_id);
        }
  
        await insertToken(user.public_id, refreshToken);
        return res.status(200).json({ accessToken, refreshToken });
      }
    
    }else {
      return res.status(400).json({error: "Usuário e/ou senha inválidos!"});
    }

  } catch (error) {
    return res.status(500).json({error: "Erro no servidor!"});
  }
}

export default loginController;