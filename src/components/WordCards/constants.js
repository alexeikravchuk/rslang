import { WORD_REQUEST_URL } from '../../constants/urlsRequests';

const URL = 'https://raw.githubusercontent.com/alexeikravchuk/rslang-data/master/';
const wordRequestURL = WORD_REQUEST_URL;
const maxPage = 30;
const maxCategory = 6;
const cardInfo = {
  translation: 'перевод',
  transcription: 'транскрипция',
  word: 'слово',
  image: 'картинка',
  meaning: 'значение',
  example: 'пример',
  meaningTranslate: 'перевод значения',
  exampleTranslate: 'перевод примера',
  audioWord: 'озвучка слова',
  audioMeaning: 'озвучка значения',
  audioExampleWord: 'озвучка примера',
  id: 'id'
};

const DOTS_COLOR = {
  green: 'green',
  red: 'red',
  orange: 'orange',
  white: 'white',
};

const RESULTS_DESCRIPTION = {
  great: 'Great :)',
  tryAgain: 'Try again !',
  almost: 'Almost ...',
  success: 'Success rate',
};

const LETTER_CLASS = {
  correct: 'word-correct',
  error: 'word-error',
};

const NOTIFICATION = 'Day plan is completed!';

export {
  URL,
  cardInfo,
  wordRequestURL,
  maxPage,
  maxCategory,
  DOTS_COLOR,
  RESULTS_DESCRIPTION,
  LETTER_CLASS,
  NOTIFICATION,
};
