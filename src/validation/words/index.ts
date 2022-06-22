import { body } from 'express-validator';

const wordsValidation = [
  body('word').trim().not().notEmpty().withMessage('word is require.'),
  body('image')
    .trim()
    .not()
    .notEmpty()
    .isURL()
    .withMessage('image is require.'),
];

const deleteWordsValidation = [
  body('id').trim().not().notEmpty().withMessage('id is require.'),
];

export { wordsValidation, deleteWordsValidation };
