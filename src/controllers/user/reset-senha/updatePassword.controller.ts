import { Request, Response } from "express";
import { getUserByCode, updatePassword } from "../../../models/User";
import bcrypt from "bcrypt";

const updatePasswordController = async (req: Request, res: Response): Promise<any> => {
  const { user_code, newPassword } = req.body;

  try {
    const userData = await getUserByCode(user_code);
    const password = userData?.password;

    if(bcrypt.compareSync(newPassword, password as string)) {
      return res.status(400).json({error: "A nova senha deve ser diferente da senha atual!"});
    }

    const user = await updatePassword(user_code, bcrypt.hashSync(newPassword, 10));

    if(!user) {
      return res.status(404).json({error: "Usuário não encontrado!"})
    }

    return res.status(201).json({message: "Senha alterada com sucesso!"});
    
  } catch (error) {
    return res.status(500).json({error: `${error} - Erro interno de servidor`});
  }
}

export default updatePasswordController;