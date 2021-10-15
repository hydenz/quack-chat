import { Router } from 'express';
import pictures from 'controllers/users/pictures';

const router = Router();

router.patch('/pictures', pictures);

export default router;
