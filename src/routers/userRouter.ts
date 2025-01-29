import express from "express";
import createUserController from "../controllers/user/createUser.controller";
import dashboardController from "../controllers/user/getUser.controller";
import { verifyAuth } from "../middleware/verifyAuth";
import { verifyRole } from "../middleware/verifyRole";

const router = express.Router();

router.post("/:public_id", verifyAuth, verifyRole, createUserController);
router.get("/dashboard/:public_id", verifyAuth, dashboardController);

export default router;