import express from "express";
import createUserController from "../controllers/user/createUser.controller";
import dashboardController from "../controllers/user/getUser.controller";
import { verifyAuth } from "../middleware/verifyAuth";

const router = express.Router();

router.post("/", createUserController);
router.get("/dashboard/:public_id", verifyAuth,dashboardController);

export default router;