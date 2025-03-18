import { Request, Response } from "express";
import { deleteHospital, getHospitalByName } from "../../models/Hospital";


const deleteHospitalController = async (req: Request, res: Response): Promise<any> => {
  const hospital = req.query.clinica;

  try {
    const hospitalData = await getHospitalByName(hospital as string);

    if(!hospitalData) {
      return res.status(404).json({error: "Clínica não encontrada!"});
    }

    await deleteHospital(hospitalData.id);

    return res.status(200).json({message: "Clínica deletada com sucesso!"});
    
  } catch (error) {
    return res.status(500).json({error: `Erro interno de servidor`});
  }
}

export default deleteHospitalController;