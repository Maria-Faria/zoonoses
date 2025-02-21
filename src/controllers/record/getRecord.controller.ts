import { Request, Response } from "express";
import { getRecordById, getServicesByRecord } from "../../models/Record";
import { getTutorById } from "../../models/Tutor";
import { getAddressById } from "../../models/Address";
import { getPetById } from "../../models/Pet";
import { getServiceById } from "../../models/Service";
import { ServiceInterface } from "./createRecord.controller";


const getRecordController = async(req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  
  try {
    const record = await getRecordById(parseInt(id));

    if(!record) {
      return res.status(404).json({error: "Nenhum registro encontrado!"});
    }

    const tutor = await getTutorById(record.tutor_id);
    const address = await getAddressById(tutor?.address as number);

    const pet = await getPetById(record.pet_id);

    const services = await getServicesByRecord(record.id);
    const servicesList: ServiceInterface[] = [];

    for(let i = 0; i < services.length; i++) {
      const service = await getServiceById(services[i].service_id as string);

      servicesList.push({
        name: service?.type as string,
        qtd: services[i].qtd,
        price: service?.price as number,
        total: service?.price as number * services[i].qtd
      })
    }

    return res.status(200).json({tutor: {cpf: tutor?.cpf, name: tutor?.name, cep: address?.cep, number: address?.number, phone: tutor?.phone}, pet: {microchip: pet?.microchip, age: pet?.age, size: pet?.size_pet, inputDate: pet?.input_date, specie: pet?.specie, breed: pet?.breed, color: pet?.color, weight: pet?.weight, gender: pet?.pet_gender, plate: pet?.plate}, services: servicesList, totalPrice: record.price});
    
  } catch (error) {
    return res.status(500).json({error: `${error} - Erro interno de servidor`});
  }

}

export default getRecordController;