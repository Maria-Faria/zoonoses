import { Request, Response } from "express";
import { getHospitalByName } from "../../models/Hospital";
import { getAddressById } from "../../models/Address";

const getHospitalController = async (req: Request, res: Response): Promise<any> => {
  const hospital = req.query.clinica;

  try {
    const hospitalData = await getHospitalByName(hospital as string);

    if(!hospitalData) {
      return res.status(404).json({error: "Clínica não encontrada!"});
    }

    const address = await getAddressById(hospitalData.address_id);

    return res.status(200).json({name: hospitalData.name, phone: hospitalData.phone, cep: address?.cep, number: address?.number});
    
  } catch (error) {
    return res.status(500).json({error: `Erro interno de servidor`});
  }
}

export default getHospitalController;