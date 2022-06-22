import { body } from 'express-validator';

const wordsValidation = [
  body('word').trim().not().notEmpty().withMessage('word is require.'),
  body('image').trim().not().notEmpty().withMessage('image is require.'),
];

export { wordsValidation };
