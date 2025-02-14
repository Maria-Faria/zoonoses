import { Request, Response } from "express";
import { insertRecord } from "../../models/Record";

const createRecordController = async (req: Request, res: Response): Promise<any> => {
  const {tutor_id, pet_id, service_id, price} = req.body;

  try {
    const record = await insertRecord(tutor_id, pet_id, service_id, price);

    if(!record) {
      return res.status(400).json({error: "Erro ao cadastrar ficha!"});
    }

    return res.status(201).json({message: "Ficha cadastrada com sucesso!"});
    
  } catch (error) {
    return res.status(500).json({error: `${error} - Erro interno de servidor`});
  }
}

export default createRecordController;