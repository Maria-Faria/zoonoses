import { Request, Response } from "express";
import { verify } from "jsonwebtoken";

export async function verifyAuth(req: Request, res: Response, next: Function) {
  const authToken = req.headers.authorization;

  if(authToken) {
    const [, token] = authToken.split(' ');

    try {
      
      verify(token, process.env.ACCESS_TOKEN_KEY || "123456");      
      return next();

    } catch (error) {
      return res.status(401).json({ error: "Não autorizado! Token expirado!"});
    }
  }

  return res.status(401).json({ error: "Não autorizado"});
}