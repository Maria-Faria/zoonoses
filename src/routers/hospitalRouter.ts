import express from "express";
import createHospitalController from "../controllers/hospital/createHospital.controller";

const router = express.Router();

router.post("/new-hospital", createHospitalController);

export default router;