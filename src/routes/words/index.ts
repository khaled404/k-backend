import { Router } from 'express';
import { addNewWord, deleteWords, getWords } from '../../controllers/words';
import { wordsValidation } from '../../validation/words';

const router = Router();

router.get('/get-words', getWords);
router.post('/add-word', wordsValidation, addNewWord);
router.delete('/delete-word/:id', deleteWords);

export default router;
