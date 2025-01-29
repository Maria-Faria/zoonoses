import { sign } from "jsonwebtoken";
export const getToken = async (user_code: number, name: string | undefined, public_id: string | undefined, expiresIn: string, tokenKey: string) : Promise<string> => {
  const tokenData = {
    user_code,
    name
  };

  const tokenOption = {
    subject: public_id,
    expiresIn: expiresIn
  };

  const token = sign(tokenData, tokenKey, tokenOption);

  return token;
}