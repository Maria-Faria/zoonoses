import express from "express";
import createServiceController from "../controllers/service/createService.controller";

const router = express.Router();

router.post("/new-service", createServiceController);

export default router;