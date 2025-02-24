import express from "express";
import { verifyAuth } from "../middleware/verifyAuth";
import createRecordController from "../controllers/record/createRecord.controller";
import getRecordController from "../controllers/record/getRecord.controller";
import UpdateRecordController from "../controllers/record/updateRecord.controller";
import getAllRecordsController from "../controllers/record/getAllRecords.controller";

const router = express.Router();

router.get("/", verifyAuth, getAllRecordsController);
router.get("/:id", verifyAuth, getRecordController);

router.post("/new-record", verifyAuth, createRecordController);

router.put("/:id", verifyAuth, UpdateRecordController);

export default router;