import { Request, Response } from "express";
import { getRecordById } from "../../models/Record";
import { getTutorById, updateTutor } from "../../models/Tutor";
import { updateAddress } from "../../models/Address";
import { updatePet } from "../../models/Pet";

const UpdateRecordController = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const { tutor, pet } = req.body;

  try {
    const record = await getRecordById(parseInt(id));
    const tutorData = await getTutorById(record?.tutor_id as string);

    const newAddress = await updateAddress(tutorData?.address as number, tutor.cep, tutor.state, tutor.city, tutor.neighborhood, tutor.road, tutor.number);

    await updateTutor(record?.tutor_id as string, tutor.name, tutor.phone, newAddress?.id as number);
    await updatePet(record?.pet_id as string, parseInt(pet.age), pet.size, <Date>pet.inputDate, pet.specie, pet.breed, pet.color, parseFloat(pet.weight), pet.gender, pet.inputType);

    return res.status(200).json({message: "Registro atualizado com sucesso!"});
    
  } catch (error) {
    return res.status(500).json({error: `${error} - Erro interno de servidor`});
  }

}

export default UpdateRecordController;