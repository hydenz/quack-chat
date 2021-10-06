import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET!, (err: any, { id }: any) => {
    if (err) return res.sendStatus(403);
    req.userId = id;
    next();
  });
};

export default authenticateToken;
