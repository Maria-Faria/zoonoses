import { Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";


const verifyAccessTokenController = async(req: Request, res: Response): Promise<any> => {
  const { accessToken } = req.body;

  try {
    verify(accessToken, process.env.ACCESS_TOKEN_KEY || "") as JwtPayload;

    return res.status(200).json({message: "Token válido"});

  } catch (error) {
    return res.status(401).json({ error: "Não autorizado"});
  }
}

export default verifyAccessTokenController;