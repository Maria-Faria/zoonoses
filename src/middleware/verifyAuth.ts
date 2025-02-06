import { Request, Response } from "express";
import { verify } from "jsonwebtoken";

export async function verifyAuth(req: Request, res: Response, next: Function) {
  const authToken = req.headers.authorization;

  if(authToken) {
    const [, token] = authToken.split(' ');

    try {
      
      verify(token, process.env.ACCESS_TOKEN_KEY as string);      
      return next();

    } catch (error) {
      return res.status(401).json({ error: `Token de acesso expirado! 
      Recarregue a página e tente novamente.`});
    }
  }

  return res.status(401).json({ error: "Não autorizado"});
}