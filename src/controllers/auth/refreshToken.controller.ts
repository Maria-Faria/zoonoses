import { Request, Response } from "express";
import { deleteUserToken, getRefreshToken, getUserToken } from "../../models/Auth";
import { JwtPayload, verify } from "jsonwebtoken";
import { getToken } from "./config/getToken";

const refreshTokenController = async (req: Request, res: Response): Promise<any> => {
  const { refreshToken } = req.body;

  try {
    const user = verify(refreshToken, process.env.REFRESH_TOKEN_KEY || "123456") as JwtPayload;

    const newAccessToken = await getToken(user.user_code, user.name, user.sub, "5m", process.env.ACCESS_TOKEN_KEY || "123456");

    return res.status(200).json({ accessToken: newAccessToken });
    
  } catch (error) {
    const userToken = await getRefreshToken(refreshToken);

    if(userToken) {
      await deleteUserToken(refreshToken);
    }

    return res.status(401).json({ message: "Não autorizado"});
  }
}

export default refreshTokenController;