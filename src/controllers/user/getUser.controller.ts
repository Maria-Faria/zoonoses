import { Request, Response } from "express";
import { getUserById } from "../../models/User";
import { JwtPayload, verify } from "jsonwebtoken";

const getUserController = async (req: Request, res: Response): Promise<any> => {
  const authToken = req.headers.authorization;

  if(authToken) {
    try {
      const [, token] = authToken.split(' ');
      const { sub } = verify(token, process.env.ACCESS_TOKEN_KEY || "123456") as JwtPayload;
      const user = await getUserById(sub as string);
  
      return res.status(200).json({
        public_id: user?.public_id,
        user_code: user?.user_code,
        name: user?.name,
        admin: user?.admin
      });
  
    } catch (error) {
      return res.status(500).send(`${error} - Erro interno de servidor`);
    }
  
  }else {
    return res.status(401).json({ error: "Não autorizado"});

  }
}

export default getUserController;