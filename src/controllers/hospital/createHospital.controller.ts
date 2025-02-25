import { Request, Response } from "express";
import { getAddress, insertAddress } from "../../models/Address";
import { getHospitals, insertHospital } from "../../models/Hospital";

const createHospitalController = async (req: Request, res: Response): Promise<any> => {
  const { name, phone, cep, state, city, neighborhood, road, number } = req.body;
  let addressId = 0;

  try {
    const allHospitals = await getHospitals();
    const allAddresses = await getAddress();

    let flag = false;
    let addressExists = false;

    allHospitals.map((item) => {
      if(item.name == name) {
        flag = true;
      }
    });

    allAddresses.map((item) => {
      if(item.state == state && item.city == city && item.road == road && item.number == number) {
        addressExists = true;
        addressId = item.id;
      }
    });

    if(!flag) {

      if(!addressExists) {
        const hospitalAddress = await insertAddress(cep, state, city, neighborhood, road, number);
        addressId = hospitalAddress.data.id;
      }
      
      const hospital = await insertHospital(name, phone, addressId);
  
      if(!hospital) {
        return res.status(400).json({error: "Erro ao cadastrar a clínica!"});
      }
  
      return res.status(201).json({message: "Clínica cadastrada com sucesso!"});
    
    }else {
      return res.status(400).json({error: "Clínica já cadastrada!"});
    }
    
  } catch (error) {
    return res.status(500).json({error: `${error} - Erro interno de servidor`});
  }
}

export default createHospitalController;