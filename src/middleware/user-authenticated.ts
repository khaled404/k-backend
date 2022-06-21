import type { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { sendError } from '../util';

type TVerify = { userId: string };
const userAuthenticated = (req: any, _res: Response, next: NextFunction) => {
  try {
    const authHeaders = req.get('Authorization');
    if (!authHeaders) sendError('Not authenticated', 401);
    const token = req.get('Authorization')?.split(' ')[1];
    const decodedToken = verify(token, process.env.secretToken) as TVerify;
    if (!decodedToken) {
      sendError('Not authenticated.', 401);
    }

    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    sendError(error.errors[0].message);
  }
};

export default userAuthenticated;
