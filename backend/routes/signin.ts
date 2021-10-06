import { Router } from 'express';
import validators from 'middlewares/validators/index';
import signIn from 'controllers/authentication/signin';

const router = Router();

router.post('/signin', validators.userSignin, signIn);

export default router;
