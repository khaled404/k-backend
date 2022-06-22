import { Schema, model } from 'mongoose';

const SentencesScheme = new Schema({
  sentence: String,
  translations: String,
});

const WordsScheme = new Schema({
  word: String,
  image: String,
  sentences: [SentencesScheme],
});

export default model('words', WordsScheme);
