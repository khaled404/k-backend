import type { TAppRouter } from '../types';
import authentication from './authentication';

const AppRouter: TAppRouter[] = [
  { routeName: '/authentication', routes: authentication },
];

export default AppRouter;
