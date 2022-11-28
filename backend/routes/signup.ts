import { Router } from "express";
import { userSignup } from "middlewares/validators/index";
import signUp from "controllers/authentication/signup";

const router = Router();

router.post("/signup", userSignup, signUp);

export default router;
