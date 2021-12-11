import bcrypt from 'bcryptjs';
import User from '../models/user';
import { NextFunction, Request, Response } from 'express';
import checkIsError from '../util/checkIsError';
import sendError from '../util/sendError';
import { sign } from 'jsonwebtoken';

const convertUser = (user: any) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  active: user.active,
});

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
    const sendUser = convertUser(user);
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

    const sendUser = convertUser(user);
    res.send({ user: sendUser });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req: any, res: Response, next: NextFunction) => {
  const { page = 1 } = req.query;
  const perPage = 2;

  try {
    checkIsError(req);

    const count = await User.find().countDocuments();
    const users = await User.find()
      .skip((page - 1) * perPage)
      .limit(perPage);
    res.send({
      users: users.map(convertUser),
      pagination: {
        total: count,
        current: page,
        next: page + 1,
      },
    });
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

export { signup, login, getCurrentUser, getAllUsers, deleteUser };
