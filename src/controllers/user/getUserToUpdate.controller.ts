import { Request, Response } from "express";
import { getUserByCode } from "../../models/User";

const getUserToUpdateController = async (req: Request, res: Response): Promise<any> => {
  const userCode = req.query.usuario;

  try {
    const user = await getUserByCode(userCode as string);

    if(!user) {
      return res.status(404).json({error: "Usuário não encontrado!"});
    }

    return res.status(200).json(user);
    
  } catch (error) {
    return res.status(500).json({error: "Erro interno de servidor! Tente novamente em alguns instantes"});
  }
}

export default getUserToUpdateController;