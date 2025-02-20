import { Request, Response } from "express";
import { insertRecord } from "../../models/Record";
import { getAddress, insertAddress } from "../../models/Address";
import { createTutor, verifyCPFInDatabase } from "../../models/Tutor";
import { createPet, getPetByMicrochip } from "../../models/Pet";
import { getServiceByType } from "../../models/Service";

interface ServiceInterface {
  name: string;
  qtd: number;
  price: number;
  total: number;
}

const createRecordController = async (req: Request, res: Response): Promise<any> => {
  const {tutor, pet, service, totalPrice} = req.body;

  try {
    const cpfExists = await verifyCPFInDatabase(tutor.cpf.replace(/[^0-9]/g, ''));
    const petExists = await getPetByMicrochip(pet.microchip);

    let tutor_id: string  = cpfExists?.public_id || "";
    let pet_id: string  = petExists?.public_id || "";
    let services_id: string[] = [];

    const services = service.services.map((item: ServiceInterface) => {
      return item.name;
    });


    for(let i = 0; i < services.length; i++) {
      const id = await getServiceByType(services[i]);
      services_id.push(id?.public_id as string);
    }

    if(!cpfExists) {
      const allAddresses = await getAddress();
      
      let addressExists = false;
      let addressId = 0;
  
      allAddresses.map((item) => {
        if(item.state == tutor.state && item.city == tutor.city && item.road == tutor.road && item.number == tutor.number) {
          addressExists = true;
          addressId = item.id;
        }
      });
  
      if(!addressExists) {
        addressId = (await insertAddress(tutor.cep, tutor.state, tutor.city, tutor.neighborhood, tutor.road, tutor.number)).data.id;
      }
    
      tutor_id = (await createTutor({name: tutor.name, phone: tutor.phone, cpf: tutor.cpf.replace(/[^0-9]/g, ''), address: addressId})).data?.public_id || "";
    }

    if(petExists === null) {
      pet_id = (await createPet(parseInt(pet.age), pet.size, <Date>pet.inputDate, pet.specie, pet.breed, pet.color, parseFloat(pet.weight), pet.gender, parseInt(pet.plate), pet.microchip, tutor_id, pet.inputType)).public_id;
    }

    const record = await insertRecord(tutor_id, pet_id, services_id, parseFloat(totalPrice));
    console.log(record);

    return res.status(201).json({message: "Ficha cadastrada com sucesso!"});

  } catch (error) {
    return res.status(500).json({error: `${error} - Erro interno de servidor`});
  }
}

export default createRecordController;