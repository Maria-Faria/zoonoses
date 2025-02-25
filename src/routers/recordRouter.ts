import { Router } from "express";
import { getRecordController } from "../controllers/record-search/getRecord.controller";

const router = Router();

router.get("/search", getRecordController);

export default router;