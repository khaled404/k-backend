import { IError } from '../models/error';

const sendError = (message: string, statusCode = 500) => {
  const error: IError = {
    statusCode,
    errors: [{ message }],
  };
  throw error;
};
export default sendError;
