import { Router } from "express";
import { userSignin } from "middlewares/validators/index";
import signIn from "controllers/authentication/signin";

const router = Router();

router.post("/signin", userSignin, signIn);

export default router;
