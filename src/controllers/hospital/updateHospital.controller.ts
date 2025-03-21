import { Request, Response } from "express";
import { AddressInterface, getAddress, insertAddress } from "../../models/Address";
import { getHospitalByName, getHospitals, HospitalInterface, insertHospital, updateHospital } from "../../models/Hospital";

const updateHospitalController = async (req: Request, res: Response): Promise<any> => {
  const { name, phone, cep, state, city, neighborhood, road, number } = req.body;
  let addressId = 0;

  try {
    const allAddresses = await getAddress();
    let addressExists = false;

    allAddresses.map((item: AddressInterface) => {
      if(item.state == state && item.city == city && item.road == road && item.number == number) {
        addressExists = true;
        addressId = item.id;
      }
    });

    if(!addressExists) {
        const hospitalAddress = await insertAddress(cep, state, city, neighborhood, road, number);
        addressId = hospitalAddress.data.id;
    }

    const hospitalData = await getHospitalByName(name);
    
    if(!hospitalData) {
      return res.status(404).json({error: "Clínica não encontrada!"});
    }
      
    const hospital = await updateHospital(hospitalData.id, phone, addressId);

    if(!hospital) {
        return res.status(400).json({error: "Erro ao atualizar a clínica!"});
    }

    return res.status(201).json({message: "Clínica atualizada com sucesso!"});
    
  } catch (error) {
    return res.status(500).json({error: `${error} - Erro interno de servidor`});
  }
}

export default updateHospitalController;