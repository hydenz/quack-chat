import { NextFunction, Request, Response } from 'express';

const userSignup = (req: Request, res: Response, next: NextFunction) => {
  const { username, password, nickname }: RequestBody = req.body;

  if (!username || !password || !nickname)
    return res.status(400).json({
      message: 'Please enter username, nickname and password',
    });

  if (username.includes('#'))
    return res
      .status(400)
      .json({ message: "Username can't include # character" });

  next();
};

interface RequestBody {
  username: string | undefined;
  password: string | undefined;
  nickname: string | undefined;
}

export default userSignup;
