import { Request } from 'express';
import { validationResult } from 'express-validator';
import { IError } from '../models/error';

const checkIsError = (req: Request) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error: IError = {
      statusCode: 422,
      errors: errors
        .array()
        .map((item) => ({ message: item.msg }))
        .filter((e) => e.message !== 'Invalid value'),
    };
    throw error;
  }
};
export default checkIsError;
