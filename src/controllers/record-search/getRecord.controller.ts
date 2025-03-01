import { RequestHandler } from "express";
import { getRecordSearch } from "../../models/RecordSearch";
import { RecordDataInterface } from "../record/getAllRecords.controller";

const getRecordSearchController: RequestHandler = async (req, res): Promise<any> => {
    const filter = req.query;
    
    const key = Object.keys(filter)[0];
    const value = Object.values(filter)[0];
    
    try {
      const recordSearch = await getRecordSearch(key, value as string);
      
      if(!recordSearch) {
        return res.status(404).json({error: "Nenhuma ficha encontrada!"});
      }

      const recordList: RecordDataInterface[] = [];

      for(let i = 0; i < recordSearch.length; i++) {
  
        recordList.push({
          id: recordSearch[i].id,
          cpf: recordSearch[i].tutors.cpf,
          name_tutor: recordSearch[i].tutors.name,
          microchip: recordSearch[i].pets.microchip,
          protocolo: recordSearch[i].pets.protocol,
          date: recordSearch[i].date,
        });
      }
      
      return res.status(200).json(recordList);
        
    } catch (error) {
      return res.status(500).send(`${error} - Erro interno de servidor`);
    }
}

export default getRecordSearchController;
