import { IError } from '../models/error';

const sendError = (message: any, statusCode = 500) => {
  const error: IError = {
    statusCode,
    errors: [{ message }],
  };
  throw error;
};
export default sendError;
