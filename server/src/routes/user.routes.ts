import { Router } from "express";
import { getMe, loginUser, registerUser } from "../controller/user.controller";
import { isAuth } from "../middlewares/IsAuth";

const router = Router();

router.get("/@me", isAuth, getMe);
router.post("/", loginUser);
router.post("/register", registerUser);

export default router;
