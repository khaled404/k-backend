import { ValidationError } from 'express-validator';

export interface IError {
  statusCode: number;
  data: ValidationError[];
  message?: string;
}
