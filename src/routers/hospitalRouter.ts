import express from "express";
import createHospitalController from "../controllers/hospital/createHospital.controller";
import getHospitalController from "../controllers/hospital/getHospital.controller";
import updateHospitalController from "../controllers/hospital/updateHospital.controller";
import deleteHospitalController from "../controllers/hospital/deleteHospital.controller";
import { verifyAuth } from "../middleware/verifyAuth";

const router = express.Router();

router.get("/search-hospital", verifyAuth, getHospitalController);

router.post("/new-hospital", createHospitalController);
router.post("/update-hospital", verifyAuth,updateHospitalController);

router.delete("/delete-hospital", verifyAuth, deleteHospitalController);

export default router;