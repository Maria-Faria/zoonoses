import express from "express";
import createUserController from "../controllers/user/createUser.controller";
import { verifyAuth } from "../middleware/verifyAuth";
import { verifyRole } from "../middleware/verifyRole";
import getCodeController from "../controllers/user/reset-senha/getCode.controller";
import verifyCodeController from "../controllers/user/reset-senha/verifyCode.controller";
import updatePasswordController from "../controllers/user/reset-senha/updatePassword.controller";
import getUserController from "../controllers/user/getUser.controller";
import updateUserController from "../controllers/user/updateUser.Controller";

const router = express.Router();

router.post("/send-code", getCodeController)
router.post("/validate-code", verifyCodeController);
router.post("/new-password", updatePasswordController);

router.get("/dashboard", verifyAuth, getUserController);
router.post("/new-user", verifyAuth, verifyRole, createUserController);
router.get("/update-user", verifyAuth, updateUserController);


export default router;