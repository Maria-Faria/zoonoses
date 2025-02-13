import { Router } from "express";
import { createTutorController } from "../controllers/tutor/createTutor.controller";
import { verifyAuth } from "../middleware/verifyAuth";


const router = Router();

router.post("/new-tutor", verifyAuth, createTutorController);

export default router;