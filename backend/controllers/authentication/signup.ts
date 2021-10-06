import { Request, Response } from 'express';
import UserService from 'services/UserService';

const signUp = async (req: Request, res: Response) => {
  const newUserId = await UserService.signUp(req.body);
  return res.status(201).json({ id: newUserId });
};

export default signUp;
