import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { getUserToken } from "../models/Auth";

export async function verifyAuth(req: Request, res: Response, next: Function) {
  const authToken = req.headers.authorization;
  const id_user = req.params.public_id;

  if(authToken) {
    const [, token] = authToken.split(' ');

    try {
      const userToken = await getUserToken(id_user);

      if(!userToken) {
        return res.status(401).json({ message: "Não autorizado"});
      }
      
      verify(token, process.env.ACCESS_TOKEN_KEY || "123456");
      
      return next();

    } catch (error) {
      return res.status(401).json({ message: "Não autorizado! Token expirado!"});
    }
  }

  return res.status(401).json({ message: "Não autorizado"});
}