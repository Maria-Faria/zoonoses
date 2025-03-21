import { Request, Response } from "express";
import { deleteUser } from "../../models/User";

const deleteUserController = async (req: Request, res: Response): Promise<any> => {
  const user = req.query.usuario;

  try {
    await deleteUser(user as string);

    return res.status(200).json({message: "Usuário deletado com sucesso!"});
    
  } catch (error) {
    console.log(error)
    return res.status(500).json({error: "Erro interno de servidor! Tente novamente mais tarde."});
  }

}

export default deleteUserController;