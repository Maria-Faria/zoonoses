import { Request, Response } from "express";
import { getUserById } from "../../models/User";

const dashboardController = async (req: Request, res: Response): Promise<any> => {
  const { public_id } = req.params;

  try {
    const user = await getUserById(public_id);

    return res.status(200).json({
      public_id: user?.public_id,
      user_code: user?.user_code,
      name: user?.name,
      admin: user?.admin
    });

  } catch (error) {
    return res.status(500).send(`${error} - Erro interno de servidor`);
  }
}

export default dashboardController;