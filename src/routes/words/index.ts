import { Router } from 'express';
import { addNewWord, deleteWords, getWords } from '../../controllers/words';
import { deleteWordsValidation, wordsValidation } from '../../validation/words';

const router = Router();

router.get('/get-words', getWords);
router.post('/add-words', wordsValidation, addNewWord);
router.delete('/delete-words', deleteWordsValidation, deleteWords);

export default router;
