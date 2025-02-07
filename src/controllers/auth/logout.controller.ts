import { Request, Response } from "express";
import { deleteUserToken } from "../../models/Auth";

const logoutController = async (req: Request, res: Response): Promise<any> => {
  const { refreshToken } = req.body;

  try {
    await deleteUserToken(refreshToken);

    return res.status(201).send("Logout realizado com sucesso!");

  } catch (error) {
    return res.status(500).send(`${error} - Erro interno de servidor`);
  }

}

export default logoutController;