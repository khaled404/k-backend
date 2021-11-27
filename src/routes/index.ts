import { Router } from 'express';
import authRoutes from './auth';

type TAppRouter = { routeName: string; routes: Router }[];

const AppRouter: TAppRouter = [{ routeName: '/auth', routes: authRoutes }];

export default AppRouter;
