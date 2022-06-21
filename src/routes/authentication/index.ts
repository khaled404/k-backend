import { Router } from 'express';
import userAuthenticated from '../../middleware/user-authenticated';
import { loginValidation, signupValidation } from '../../validation';
import {
  login,
  signup,
  getCurrentUser,
} from '../../controllers/authentication';

const router = Router();

router.post('/register', signupValidation, signup);
router.post('/login', loginValidation, login);
router.get('/current-user/:id', userAuthenticated, getCurrentUser);

export default router;
