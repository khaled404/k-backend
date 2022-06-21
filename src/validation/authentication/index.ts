import { body } from 'express-validator';
import user from '../../models/authentication';

const signupValidation = [
  body('email')
    .isEmail()
    .withMessage('email is require.')
    .custom(async (value) => {
      const isEmailExists = await user.findOne({ email: value });
      if (isEmailExists) {
        return Promise.reject('email address already exists!');
      }
    })
    .normalizeEmail(),
  body('name').trim().not().notEmpty().withMessage('name is require.'),
  body('password')
    .trim()
    .isLength({ min: 5 })
    .notEmpty()
    .withMessage('password is require.'),
];

const loginValidation = [
  body('email').isEmail().withMessage('email is require.').normalizeEmail(),
  body('password')
    .trim()
    .isLength({ min: 5 })
    .notEmpty()
    .withMessage('password is require.'),
];
export { signupValidation, loginValidation };
