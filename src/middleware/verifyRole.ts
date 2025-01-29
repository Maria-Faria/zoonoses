import { Request, Response } from "express";
import { getUserById } from "../models/User";

export async function verifyRole(req: Request, res: Response, next: Function) {
  const id_user = req.params.public_id;

  try {
    const user = await getUserById(id_user);

    console.log(user)

    if(!user) {
      return res.status(404).json({ message: "Usuário não encontrado!"});
    }

    if(user?.admin) {
      return next();
    
    }else {
      return res.status(401).send("Usuário não autorizado! Contate o administrador da unidade");
    }

  } catch (error) {
    return res.status(401).send("Usuário não autorizado!");
  }
}