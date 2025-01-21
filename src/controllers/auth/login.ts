import { Request, Response } from "express";
import { getUserByCode } from "../../models/User";
import { validateUserToLogin } from "../../models/User";
import bcrypt from "bcrypt";

const loginController = async (req: Request, res: Response): Promise<any> => {
  const { user_code, password } = req.body;

  try {
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
      return res.status(200).send("Usuário logado com sucesso!");
    
    }else {
      return res.status(400).send("Usuário e/ou senha inválidos!");
    }

  } catch (error) {
    console.log(error);
    return res.status(500).send("Erro no servidor!");
  }
}

export default loginController;