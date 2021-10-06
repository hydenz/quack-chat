import { Response, Request } from 'express';
import MessageService from 'services/MessageService';

const fetchMessages = async (req: Request, res: Response) => {
  const messages = await MessageService.getMessages(req.userId!);
  await MessageService.deleteMessages(req.userId!);
  return res.status(200).json({ messages });
};

export default fetchMessages;
