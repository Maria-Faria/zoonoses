import { Request, Response } from "express";
import { verifyCPFInDatabase } from "../../models/Tutor";
import { getAddressById } from "../../models/Address";

const getTutorController = async (req: Request, res: Response): Promise<any> => {
  const { cpf } = req.query;

  try {
    if(cpf) {

      const tutor = await verifyCPFInDatabase((cpf as string).replace(/[^0-9]/g, ''));
  
      if(tutor) {
        const tutorAddress = await getAddressById(tutor.address);
  
        return res.status(200).json({name: tutor.name, cep: tutorAddress?.cep, number: tutorAddress?.number, phone: tutor.phone});
      }
    }

    return res.status(404).json({error: "Tutor não cadastrado!"});
    
  } catch (error) {
    return res.status(500).json({error: `${error} - Erro interno de servidor`});
  }
}

export default getTutorController;