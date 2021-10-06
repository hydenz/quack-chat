import fetchMessages from 'controllers/messages/fetchMessages';
import { Router } from 'express';

const router = Router();

router.delete('/messages', fetchMessages);

export default router;
