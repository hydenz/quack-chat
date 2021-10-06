import { Request, Response } from 'express';
import UserService from 'services/UserService';

const signIn = async (req: Request, res: Response) => {
  const accessToken = await UserService.signIn(req.body);
  return res.status(200).json({ accessToken });
};

export default signIn;
