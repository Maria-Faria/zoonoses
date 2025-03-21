import { Request, Response } from "express";
import { getUserById, updateUser } from "../../models/User";
import { JwtPayload, verify } from "jsonwebtoken";

const updateUserProfileController = async (req: Request, res: Response): Promise<any> => {
  const authToken = req.headers.authorization;
  const newName = req.body.name;

  if(authToken) {
    try {
        const [, token] = authToken.split(' ');
        const { sub } = verify(token, process.env.ACCESS_TOKEN_KEY || "123456") as JwtPayload;
        const dataUser = await getUserById(sub as string);
        
        if (!dataUser) {
            return res.status(404).json({ error: "Usuário não encontrado!" });
        }
    
        const user = await updateUser(dataUser.public_id, newName);
      
        if(!user) {
            return res.status(400).json({error: "Erro ao atualizar o usuário!"});
        }

        return res.status(201).json({message: "Usuário atualizado com sucesso!", name: user.name});
  
    } catch (error) {
      return res.status(500).send(`${error} - Erro interno de servidor`);
    }
  
  }else {
    return res.status(401).json({ error: "Não autorizado"});

  }
}

export default updateUserProfileController;