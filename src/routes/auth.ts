import { Router } from 'express';
import { login, signup } from '../controllers/auth';
import { loginValidation, signupValidation } from '../validation/auth';

const router = Router();

router.put('/signup', signupValidation, signup);
router.post('/login', loginValidation, login);

export default router;
