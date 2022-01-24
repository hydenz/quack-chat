import { Response, Request } from 'express';
import MessageService from 'services/MessageService';
import UserService from 'services/UserService';

const getUsers = async (req: Request, res: Response) => {
  const foundUsers = await UserService.findUsers(req);
  return res.status(200).json({ results: foundUsers });
};

const getMessages = async (req: Request, res: Response) => {
  const messages = await MessageService.getMessages(req.userId!);
  await MessageService.deleteMessages(req.userId!);
  return res.status(200).json({ messages });
};

const updatePicture = async (req: Request, res: Response) => {
  const { base64Image } = req.body;
  await UserService.savePicture(req.userId!, base64Image);
  return res.sendStatus(200);
};

export { getUsers, updatePicture, getMessages };
