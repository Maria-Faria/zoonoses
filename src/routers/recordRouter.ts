import express from "express";
import { verifyAuth } from "../middleware/verifyAuth";
import createRecordController from "../controllers/record/createRecord.controller";

const router = express.Router();

router.post("/new-record", verifyAuth, createRecordController);

export default router;