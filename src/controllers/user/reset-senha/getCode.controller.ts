import { Request, Response } from "express";
import { getUserByCode, saveCodeResetPassword } from "../../../models/User";
import sendEmail from "./sendEmail.controller";

const getCodeController = async (req: Request, res: Response): Promise<any> => {
  const { user_code } = req.body;
  const code = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

  try {
    const user = await getUserByCode(user_code);

    if(user == null) {
      return res.status(404).json({ error: "Usuário não encontrado!"});
    }

    const sendEmailSuccess = sendEmail(code, user.email);
    const emailResponse = await sendEmailSuccess;

    await saveCodeResetPassword(user.email, code.toString());

    if(emailResponse == "Erro ao enviar email!") {
      return res.status(400).json({ error: "Erro ao enviar email!"});
    }

    return res.status(200).json({message: "Código enviado"});

  } catch (error) {
    return res.status(500).send(`${error} - Erro interno de servidor`);
  }

}

export default getCodeController;