export interface IError {
  statusCode: number;
  errors: { value: unknown; message: string }[];
  message?: string;
}
