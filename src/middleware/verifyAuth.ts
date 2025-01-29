import { Request, Response } from "express";
import { verify } from "jsonwebtoken";

export function verifyAuth(req: Request, res: Response, next: Function) {
  const authToken = req.headers.authorization;

  if(authToken) {
    const [, token] = authToken.split(' ');

    try {
      const { sub } = verify(token, process.env.TOKEN_KEY || "123456");

      console.log(sub);
      
      return next();

    } catch (error) {
      return res.status(401).json({ message: "Não autorizado"});
    }
  }

  return res.status(401).json({ message: "Não autorizado"});
}