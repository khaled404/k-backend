export interface IError {
  statusCode: number;
  errors: { message: string }[];

  message?: string;
}
