import { RequestHandler } from "express";
import { createTutor, verifyCPFInDatabase } from "../../models/Tutor";
import { getAddress, insertAddress } from "../../models/Address";

export const createTutorController: RequestHandler = async (req, res) => {
  let addressId = 0;

  try {
    const { address, ...tutorData } = req.body.tutor;
    
    if (!address.state || !address.city || !address.neighborhood || !address.road || !tutorData.name || !tutorData.cpf || !tutorData.phones) {
      res.status(400).json({ message: "Dados inválidos! O campo 'tutor' e 'address' são obrigatórios." });
      return;
    }
    
    const cpfExists = await verifyCPFInDatabase(tutorData.cpf);
    if (cpfExists) {
      res.status(400).json({ message: "CPF já cadastrado no sistema!" });
      return;
    }
    
    // Criar endereço no banco
    const allAddresses = await getAddress();
    let addressExists = false;

    allAddresses.map((item) => {
      if(item.state == address.state && item.city == address.city && item.road == address.road && item.number == address.number) {
        addressExists = true;
        addressId = item.id;
      }
    });

    if(!addressExists) {
      const registerAddress = await insertAddress(address.state, address.city, address.neighborhood, address.road, address.number as string);
      addressId = registerAddress.data.id;
    }

    const registerAddress = await insertAddress(address.state, address.city, address.neighborhood, address.road, address.number as string);

    if (!registerAddress?.success || !registerAddress.data?.id) {
      res.status(400).json({ message: "Erro ao cadastrar endereço" });
      return;

    }
    
    const newTutor = await createTutor({ ...tutorData, addresss: registerAddress.data.id });

    if (!newTutor.success) {
      res.status(400).json({
        message: "Erro ao criar tutor",
        error: newTutor.error || "Erro desconhecido"
      });
      return;
    }

      res.status(201).json({
      message: "Tutor criado com sucesso!",
      data: newTutor.data
    });
    return;

  } catch (error) {
    console.error("Erro no servidor:", error);
    res.status(500).json({ 
      message: "Erro interno de servidor",
      error: String(error) 
    });
    return;
  }
};
