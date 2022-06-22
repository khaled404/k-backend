import type { TAppRouter } from '../types';
import authentication from './authentication';
import words from './words';

const AppRouter: TAppRouter[] = [
  { routeName: '/authentication', routes: authentication },
  { routeName: '/words', routes: words },
];

export default AppRouter;
