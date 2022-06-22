import { Router } from 'express';
import { addNewWord, deleteWords, getWords } from '../../controllers/words';
import { deleteWordsValidation, wordsValidation } from '../../validation/words';

const router = Router();

router.get('/get-words', getWords);
router.post('/add-word', wordsValidation, addNewWord);
router.delete('/delete-word', deleteWordsValidation, deleteWords);

export default router;
