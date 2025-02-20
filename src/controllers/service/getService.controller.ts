import { Request, Response } from "express";
import { getServices } from "../../models/Service";

const getServiceController = async (req: Request, res: Response): Promise<any> => {
  try {
    const services = await getServices();

    if(!services) {
      return res.status(404).json({error: "Nenhum serviço cadastrado!"});
    }

    return res.status(200).json(services);
    
  } catch (error) {
    return res.status(500).json({error: `${error} - Erro interno de servidor`});
  }

}

export default getServiceController;