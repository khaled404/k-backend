import type { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../../models/authentication';
import { sign } from 'jsonwebtoken';
import { checkIsError, convertToSchema, sendError } from '../../util';

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
      { email: user.email, userId: user._id },
      process.env.secretToken,
      { expiresIn: '1h' },
    );
    const sendUser = convertToSchema(user);
    res.send({ token, user: sendUser });
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;

  try {
    checkIsError(req);

    const user = await User.findById(id);
    if (!user) sendError('Not authenticated', 401);

    const sendUser = convertToSchema(user);
    res.send({ user: sendUser });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    checkIsError(req);
    return User.findByIdAndRemove(id);
  } catch (error) {
    next(error);
  }
};

export { signup, login, getCurrentUser, deleteUser };
