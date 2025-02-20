import express from "express";
import createServiceController from "../controllers/service/createService.controller";
import getServiceController from "../controllers/service/getService.controller";

const router = express.Router();

router.get("/", getServiceController);

router.post("/new-service", createServiceController);

export default router;