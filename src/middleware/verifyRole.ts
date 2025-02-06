import { Request, Response } from "express";
import { getUserById } from "../models/User";
import { verify } from "jsonwebtoken";

export async function verifyRole(req: Request, res: Response, next: Function) {
  const authToken = req.headers.authorization;

  if(authToken) {
    const [, token] = authToken.split(' ');

    try {
      const { sub } = verify(token, process.env.ACCESS_TOKEN_KEY as string);      
      const user = await getUserById(sub as string);
    
      if(!user) {
        return res.status(404).json({ error: "Usuário não encontrado!"});
      }
  
      if(user?.admin) {
        return next();
      
      }else {
        return res.status(401).json({error: "Usuário não autorizado! Contate o administrador da unidade"});
      }
  
    } catch (error) {
      return res.status(401).json({error: "Usuário não autorizado!"});
    }
  }

}