import bcrypt from 'bcryptjs';
import User from '../models/user';
import { NextFunction, Request, Response } from 'express';
import checkIsError from '../util/checkIsError';
import sendError from '../util/sendError';
import { sign } from 'jsonwebtoken';

const signup = async (req: Request, res: Response, next: NextFunction) => {
  const { email, name, password } = req.body;

  try {
    checkIsError(req);
    const hashedPw = await bcrypt.hash(password, 12);
    if (hashedPw) {
      const user = new User({
        email,
        name,
        password: hashedPw,
      });
      await user.save();
      res.status(201).json({ message: 'User created!' });
    }
  } catch (error) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {
    checkIsError(req);
    const user = await User.findOne({ email });
    if (!user) sendError('A user could not be found.', 401);

    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) sendError('Wrong password!', 401);

    const token = sign(
      { email: user.email, userId: user._id.toString() },
      process.env.secretToken,
      { expiresIn: '1h' },
    );
    const sendUser = { id: user._id, email: user.email, name: user.name };
    res.send({ token, ...sendUser });
  } catch (error) {
    next(error);
  }
};

export { signup, login };
