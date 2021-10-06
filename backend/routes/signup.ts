import { Router } from 'express';
import validators from 'middlewares/validators/index';
import signUp from 'controllers/authentication/signup';

const router = Router();

router.post('/signup', validators.userSignup, signUp);

export default router;
