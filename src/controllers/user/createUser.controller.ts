import { createUser, validateUserToCreate } from "../../models/User";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { User } from "../../models/User";
import sendEmail from "./reset-senha/sendEmail.controller";

const createUserController = async (req: Request, res: Response): Promise<any> => {
  try {
    const user = req.body;
    const validatedUser = validateUserToCreate(user);

    if(validatedUser?.error || !validatedUser?.success) {
      return res.status(400).json({
        error: "Erro ao criar um novo usuário! Verifique os dados!",
        fieldErrors: validatedUser.error.flatten().fieldErrors
      });
    }

    validatedUser.data.password = bcrypt.hashSync(`${validatedUser.data.name.split(" ")[0]}#${validatedUser.data.user_code}`, 10);

    const newUser: User = {
      user_code: validatedUser.data.user_code,
      name: validatedUser.data.name,
      email: validatedUser.data.email,
      password: validatedUser.data.password
    }

    const result = await createUser(newUser);

    const emailContent = `
      Olá, seu acesso ao sistema de Zoonoses foi criado.
      Para realizar seu primeiro acesso, na <a href="https://zoonoses-front.vercel.app/login">tela de login</a>, digite a senha abaixo para realizar o login: <br><br> <h1 style="text-align: center">${validatedUser.data.name.split(" ")[0]}#${validatedUser.data.user_code}</h1>
      <br><br>
      Atenciosamente, <br>
      <img src="https://i.ibb.co/6crKmrft/Design-sem-nome.png">
    `;

    const sendEmailSuccess = sendEmail(newUser.email, emailContent, "Criação de acesso ao sistema de Zoonoses");
    const emailResponse = await sendEmailSuccess;

    if(emailResponse == "Erro ao enviar email!") {
      return res.status(400).json({ error: "Erro ao enviar email!"});
    }

    return res.status(200).json({message: "Usuário cadastrado com sucesso! A senha padrão para login foi enviada para o e-mail institucional do usuário cadastrado."});

  } catch (error: Error | any) {
    if(error.code == 'P2002') {
      return res.status(400).json({
        error: "Usuário já cadastrado!"
      })
    }

    return res.status(500).json({
      error: `${error} - Erro interno de servidor`
    })
  }
};

export default createUserController;