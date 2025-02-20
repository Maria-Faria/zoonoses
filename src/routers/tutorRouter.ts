import { Router } from "express";
import { createTutorController } from "../controllers/tutor/createTutor.controller";
import { verifyAuth } from "../middleware/verifyAuth";
import getTutorController from "../controllers/tutor/getTutor.controller";


const router = Router();

router.get("/check-cpf", getTutorController);

router.post("/new-tutor", verifyAuth, createTutorController);

export default router;