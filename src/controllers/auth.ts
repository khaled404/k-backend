import bcrypt from 'bcryptjs';
import User from '../models/user';
import { NextFunction, Request, Response } from 'express';
import checkIsError from '../util/checkIsError';

const signup = (req: Request, res: Response, next: NextFunction) => {
  checkIsError(req);
  const { email, name, password } = req.body;
  bcrypt
    .hash(password, 12)
    .then((hashedPw) => {
      const user = new User({
        email,
        name,
        password: hashedPw,
      });
      return user.save();
    })
    .then(() => {
      res.status(201).json({ message: 'User created!' });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

export { signup };
