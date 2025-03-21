import { Request, Response } from "express";
import { updateUserByCode } from "../../models/User";

const updateUserController = async (req: Request, res: Response): Promise<any> => {
  const user = req.body;

  try {
    const userUpdated = await updateUserByCode(user.user_code, user.name, user.email, user.code);

    if(!userUpdated) {
      return res.status(404).json({error: "Ocorreu um erro ao atualizar o usuário!"});
    }

    return res.status(201).json({message: "Usuário atualizado com sucesso!"});
    
  } catch (error) {
    return res.status(500).json({error: "Erro interno de servidor! Tente novamente mais tarde."});
  }

}

export default updateUserController;