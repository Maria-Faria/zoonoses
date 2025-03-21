import { Request, Response } from "express";
import { getAllRecords } from "../../models/Record";
import { getTutorById } from "../../models/Tutor";
import { getPetById } from "../../models/Pet";

export interface RecordDataInterface {
  id: number | undefined;
  cpf: string | undefined;
  name_tutor: string | undefined;
  microchip: string | undefined | null;
  protocolo: number | undefined;
  date: Date | string;
}

const getAllRecordsController = async (req: Request, res: Response): Promise<any> => {
  try {
    let page = parseInt(req.query.page as string) || 1;
    let limit = parseInt(req.query.limit as string) || 10;

    if (page < 1) page = 1;
    if (limit < 1) limit = 10;

    const offset = (page - 1) * limit;

    const { records, total } = await getAllRecords(limit, offset);

    if (!records || records.length === 0) {
      return res.status(404).json({ error: "Nenhuma ficha cadastrada!" });
    }

    const recordList: RecordDataInterface[] = [];

    for (let i = 0; i < records.length; i++) {
      const tutor = await getTutorById(records[i].tutor_id);
      const pet = await getPetById(records[i].pet_id);

      recordList.push({
        id: records[i].id,
        cpf: tutor?.cpf,
        name_tutor: tutor?.name,
        microchip: pet?.microchip,
        protocolo: pet?.protocol,
        date: records[i].date,
      });
    }

    return res.status(200).json({
      recordList,
      totalPage: Math.ceil(total / limit),
    });

  } catch (error) {
    return res.status(500).json({ error: `Erro interno de servidor` });
  }
};

export default getAllRecordsController;