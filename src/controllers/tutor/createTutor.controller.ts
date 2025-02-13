import { RequestHandler } from "express";
import { createTutor, verifyCPFInDatabase } from "../../models/Tutor";
import { createAddress } from "../../models/Address";

export const createTutorController: RequestHandler = async (req, res) => {
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
    const registerAddress = await createAddress(address.state, address.city, address.neighborhood, address.road, address.number as string);
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
