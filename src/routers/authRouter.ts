import express from "express";
import loginController from "../controllers/auth/login.controller";
import refreshTokenController from "../controllers/auth/refreshToken.controller";
import logoutController from "../controllers/auth/logout.controller";

const router = express.Router();

router.post("/login", loginController);
router.get("/refresh/:public_id", refreshTokenController);
router.get("/logout/:public_id", logoutController);

export default router;