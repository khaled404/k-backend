import { Router } from 'express';
import isAuth from '../middleware/isAuth';
import { loginValidation, signupValidation } from '../validation/auth';
import {
  login,
  signup,
  getCurrentUser,
  getAllUsers,
} from '../controllers/auth';

const router = Router();

router.put('/signup', signupValidation, signup);
router.post('/login', loginValidation, login);
router.get('/current-user/:id', isAuth, getCurrentUser);
router.get('/all-user', isAuth, getAllUsers);

export default router;
