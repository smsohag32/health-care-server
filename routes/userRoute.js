import { Router } from "express";
import { signIn, singUp } from "../controllers/userController.js";

const router = Router();

router.post("/auth/singin", signIn);
router.post("/auth/registration", singUp);

export default router;
