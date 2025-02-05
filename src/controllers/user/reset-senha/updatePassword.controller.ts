import { Request, Response } from "express";
import { updatePassword } from "../../../models/User";
import bcrypt from "bcrypt";

const updatePasswordController = async (req: Request, res: Response): Promise<any> => {
  const { user_code, newPassword } = req.body;

  try {
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