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

    const emailContent = `
      Olá, recebemos sua solicitação para redefinir sua senha. Digite o código abaixo para redefinir a senha: <br><br> <h1 style="text-align: center">${code}</h1>
      <br><br>
      Atenciosamente, <br>
      <img src="https://i.ibb.co/6crKmrft/Design-sem-nome.png">
    `;

    const sendEmailSuccess = sendEmail(user.email, emailContent, "Solicitação para redefinição de senha");
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