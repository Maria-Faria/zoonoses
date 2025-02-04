import { Request, Response } from "express";
import { deleteCodeResetPassword, getCodeResetPassword, getUserByCode } from "../../../models/User";

const verifyCodeController = async(req: Request, res: Response): Promise<any> => {
  const { user_code, code }  = req.body;

  try {
    const user = await getUserByCode(user_code);
    const code_data = await getCodeResetPassword(user?.email || "");

    if(!code_data || !user || code_data.code != code) {
      return res.status(404).json({ error: "Código inválido!"});
    }

    deleteCodeResetPassword(user.email);
    return res.status(200).json({message: "Código valido"});
    
  } catch (error) {
    return res.status(500).json({error: `${error} - Erro interno de servidor`});
  }
}

export default verifyCodeController;