import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import { IError } from '../models/error';
import User from '../models/user';

const signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error: IError = {
      statusCode: 422,
      data: errors.array(),
    };
    throw error;
  }
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
