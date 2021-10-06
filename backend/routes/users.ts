import users from 'controllers/users/users';
import { Router } from 'express';

const router = Router();

router.get('/users/:id?', users);

export default router;
