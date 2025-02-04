import express from "express";
import createUserController from "../controllers/user/createUser.controller";
import dashboardController from "../controllers/user/getUser.controller";
import { verifyAuth } from "../middleware/verifyAuth";
import { verifyRole } from "../middleware/verifyRole";
import getCodeController from "../controllers/user/reset-senha/getCode.controller";
import verifyCodeController from "../controllers/user/reset-senha/verifyCode.controller";

const router = express.Router();

router.post("/send-code", getCodeController)
router.post("/validate-code", verifyCodeController);
router.post("/:public_id", verifyAuth, verifyRole, createUserController);

router.get("/dashboard/:public_id", verifyAuth, dashboardController);

export default router;