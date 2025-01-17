import express from "express";
import createUserController from "../controllers/user/createUser";

const router = express.Router();

router.post("/", createUserController);

export default router;