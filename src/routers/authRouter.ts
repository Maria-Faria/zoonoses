import express from "express";
import loginController from "../controllers/auth/login.controller";
import refreshTokenController from "../controllers/auth/refreshToken.controller";
import logoutController from "../controllers/auth/logout.controller";
import verifyAccessTokenController from "../controllers/auth/verifyAccessToken.controller";

const router = express.Router();

router.post("/login", loginController);
router.post("/validate-token", verifyAccessTokenController);
router.post("/refresh/", refreshTokenController);

router.post("/logout", logoutController);

export default router;