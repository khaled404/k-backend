import type { Router } from 'express';

type TError = {
  status: number;
  errors: { message: string }[];

  message?: string;
};

type TAppRouter = { routeName: string; routes: Router };

export { TError, TAppRouter };
