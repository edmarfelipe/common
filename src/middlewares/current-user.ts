import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken';

interface UserPayLoad {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayLoad
    }
  }
}

export default function CurrentUser(req: Request, res: Response, next: NextFunction) {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayLoad

    req.currentUser = payload || null

  } catch (err) {
    console.log(err);
  }

  next();
}
