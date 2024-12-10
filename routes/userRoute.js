import { Router } from "express";
import { getAllUsers, signIn, singUp } from "../controllers/userController.js";

const router = Router();

router.post("/auth/singin", signIn);
router.post("/auth/registration", singUp);
router.get("/users/all", getAllUsers);

export default router;
