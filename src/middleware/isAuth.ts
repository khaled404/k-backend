import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import sendError from '../util/sendError';

const isAuth = (req: any, _res: Response, next: NextFunction) => {
  try {
    const authHeaders = req.get('Authorization');
    if (!authHeaders) sendError('Not authenticated', 401);
    const token = req.get('Authorization')?.split(' ')[1];
    const decodedToken: any = verify(token, process.env.secretToken);
    if (!decodedToken) {
      sendError('Not authenticated.', 401);
    }

    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    sendError(error.errors[0].message);
  }
};

export default isAuth;
