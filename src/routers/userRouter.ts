import express from "express";
import createUserController from "../controllers/user/createUser.controller";
import { verifyAuth } from "../middleware/verifyAuth";
import { verifyRole } from "../middleware/verifyRole";
import getCodeController from "../controllers/user/reset-senha/getCode.controller";
import verifyCodeController from "../controllers/user/reset-senha/verifyCode.controller";
import updatePasswordController from "../controllers/user/reset-senha/updatePassword.controller";
import getUserController from "../controllers/user/getUser.controller";
import getUserToUpdateController from "../controllers/user/getUserToUpdate.controller";
import updateUserProfileController from "../controllers/user/updateUserProfile.controller";
import updateUserController from "../controllers/user/updateUser.controller";
import deleteUserController from "../controllers/user/deleteUser.controller";

const router = express.Router();

router.post("/send-code", getCodeController)
router.post("/validate-code", verifyCodeController);
router.post("/new-password", updatePasswordController);
router.post("/update-profile", verifyAuth, updateUserProfileController);
router.post("/new-user", verifyAuth, verifyRole, createUserController);
router.post("/update-user", verifyAuth, verifyRole,updateUserController);

router.get("/dashboard", verifyAuth, getUserController);
router.get("/search-user", verifyAuth, getUserToUpdateController);


router.delete("/delete-user", verifyAuth, verifyRole, deleteUserController);


export default router;