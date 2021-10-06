import { NextFunction, Request, Response } from 'express';

const userSignin = (req: Request, res: Response, next: NextFunction) => {
  const { username, password }: RequestBody = req.body;

  if (!username || !password)
    return res.status(400).json({
      message: 'Please enter username and password',
    });

  next();
};

interface RequestBody {
  username: string | undefined;
  password: string | undefined;
}

export default userSignin;
