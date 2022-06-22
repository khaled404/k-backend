import type { Request } from 'express';
import { validationResult } from 'express-validator';

const sendError = (message: any, status = 500) => {
  const error = {
    status,
    errors: message,
  };
  throw error;
};

const checkIsError = (req: Request) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = {
      status: 422,
      errors: errors
        .array()
        .map((item) => ({ message: item.msg }))
        .filter((item) => item.message !== 'Invalid value'),
    };
    throw error;
  }
};

export { sendError, checkIsError };
