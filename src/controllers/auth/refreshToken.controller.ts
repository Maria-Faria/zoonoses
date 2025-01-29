import { Request, Response } from "express";
import { deleteUserToken, getUserToken } from "../../models/Auth";
import { JwtPayload, verify } from "jsonwebtoken";
import { getToken } from "./config/getToken";

const refreshTokenController = async (req: Request, res: Response): Promise<any> => {
  const id_user = req.params.public_id;

  try {
    const userToken = await getUserToken(id_user);
    
    if(!userToken) {
      return res.status(400).send("Token inválido!");
    }

    const user = verify(userToken.refreshToken, process.env.REFRESH_TOKEN_KEY || "123456") as JwtPayload;
    const newAccessToken = await getToken(user.user_code, user.name, id_user, "1m", process.env.ACCESS_TOKEN_KEY || "123456");

    return res.status(200).json({ accessToken: newAccessToken });
    
  } catch (error) {
    await deleteUserToken(id_user);
    return res.status(401).json({ message: "Não autorizado"});
  }
}

export default refreshTokenController;