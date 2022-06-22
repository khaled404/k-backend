import type { NextFunction, Request, Response } from 'express';
import Words from '../../models/words';
import { checkIsError, convertToSchema, sendError } from '../../util';

const getWords = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await Words.find();
    const convertData = data.map(convertToSchema);
    res.send(convertData);
  } catch (error) {
    next(error);
  }
};

const addNewWord = async (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  try {
    checkIsError(req);
    const isAlreadyExists = await Words.findOne({ word: body?.word });

    if (isAlreadyExists) sendError('Word is already exists', 400);

    const word = await new Words(body).save();
    const convertData = convertToSchema(word);
    res.send(convertData);
  } catch (error) {
    next(error);
  }
};

const deleteWords = async (req: Request, res: Response, next: NextFunction) => {
  const { query } = req;
  try {
    checkIsError(req);
    await Words.findOneAndRemove({ _id: query.id });
    res.send({ message: 'successfully removed' });
  } catch (error) {
    next(error);
  }
};

export { getWords, addNewWord, deleteWords };
