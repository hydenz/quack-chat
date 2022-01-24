import { Request, Response } from 'express';
import UserService from 'services/UserService';

const signIn = async (req: Request, res: Response) => {
  const accessToken = await UserService.signIn(req.body);
  return res.status(200).json({ accessToken });
};

const signUp = async (req: Request, res: Response) => {
  const newUserId = await UserService.signUp(req.body);
  return res.status(201).json({ id: newUserId });
};

export { signIn, signUp };
