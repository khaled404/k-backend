import { Router } from 'express';
import { signup } from '../controllers/auth';
import { signupValidation } from '../validation/auth';

const router = Router();

router.put('/signup', signupValidation, signup);

export default router;
