import { RequestHandler } from "express";
// import { getRecordSearch } from "../../models/RecordSearch";

const getRecordSearchController: RequestHandler = async (req, res) => {
    const { filterSelected, filterValue } = req.query;
    console.log(filterSelected, filterValue);

    const { id, cpf,protocol, microchip, type } = req.body;
    
    try {

      //const recordSearch = await getRecordSearch({ id, cpf, protocol, microchip, type });
      //res.status(200).json(recordSearch);
      return;
        
    } catch (error) {
        res.status(500).send(`${error} - Erro interno de servidor`);
        return;
    }
}

export default getRecordSearchController;
