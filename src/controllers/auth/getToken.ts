import { sign } from "jsonwebtoken";
export const getToken = async (user_code: number, name: string | undefined, public_id: string | undefined) : Promise<string> => {
  const tokenData = {
    user_code,
    name
  };

  const tokenKey = process.env.TOKEN_KEY || "123456";
  const tokenOption = {
    subject: public_id,
    expiresIn: "4h"
  };

  const token = sign(tokenData, tokenKey, tokenOption);

  return token;
}