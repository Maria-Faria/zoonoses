import { Request, Response } from "express";
import { insertService } from "../../models/Service";

const createServiceController = async(req: Request, res: Response): Promise<any> => {
  const { serviceType, serviceValue } = req.body;

  try {
    const newService = await insertService(serviceType, parseFloat(serviceValue));

    if(!newService) {
      return res.status(400).json({error: "Erro ao criar serviço!"});
    }

    return res.status(201).json({message: "Serviço criado com sucesso!"});
    
  } catch (error: Error | any) {
    if(error.code == 'P2002') {
      return res.status(400).json({
        error: "Serviço já cadastrado!"
      })
    }

    return res.status(500).json({error: "Erro interno de servidor"});
  }

}

export default createServiceController;