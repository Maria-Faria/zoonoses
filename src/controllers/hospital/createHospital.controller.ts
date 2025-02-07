import { Request, Response } from "express";
import { insertAddress } from "../../models/Address";
import { insertHospital } from "../../models/Hospital";

const createHospitalController = async (req: Request, res: Response): Promise<any> => {
  const { name, phone, email = null, state, city, neighborhood, road, number } = req.body;

  try {
    const hospitalAddress = await insertAddress(state, city, neighborhood, road, number);
    const hospital = await insertHospital(name, phone, email, hospitalAddress.id);

    if(!hospital) {
      return res.status(400).json({error: "Erro ao cadastrar a clínica!"});
    }

    return res.status(201).json({message: "Clínica cadastrada com sucesso!"});
    
  } catch (error) {
    return res.status(500).json({error: `${error} - Erro interno de servidor`});
  }
}

export default createHospitalController;