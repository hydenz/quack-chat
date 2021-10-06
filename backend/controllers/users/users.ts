import { Response, Request } from 'express';
import UserService from 'services/UserService';

const users = async (req: Request, res: Response) => {
  const foundUsers = await UserService.findUsers(req);
  return res.status(200).json({ results: foundUsers });
};

export default users;
