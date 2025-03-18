import express from "express";
import createHospitalController from "../controllers/hospital/createHospital.controller";
import getHospitalController from "../controllers/hospital/getHospital.controller";
import { verifyAuth } from "../middleware/verifyAuth";

const router = express.Router();

router.get("/search-hospital", verifyAuth, getHospitalController);

router.post("/new-hospital", createHospitalController);

export default router;