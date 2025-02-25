import { RequestHandler } from "express";
import { getRecordSearch } from "../../models/RecordSearch";

export const getRecordController: RequestHandler = async (req, res) => {

    const { id, cpf,protocol, microchip, type } = req.body;
    
    try {

        const recordSearch = await getRecordSearch({ id, cpf, protocol, microchip, type });
        res.status(200).json(recordSearch);
        return;
        
    } catch (error) {
        res.status(500).send(`${error} - Erro interno de servidor`);
        return;
    }
}
