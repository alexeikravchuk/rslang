const maxPage = 30;
const maxCategory = 6;
const cardInfo = {
  translation: '...',
  transcription: '...',
  word: '',
  image: 'картинка',
  meaning: 'значение',
  example: 'пример',
  meaningTranslate: 'перевод значения',
  exampleTranslate: 'перевод примера',
  audioWord: 'озвучка слова',
  audioMeaning: 'озвучка значения',
  audioExampleWord: 'озвучка примера',
  id: 'id',
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
  cardInfo,
  maxPage,
  maxCategory,
  DOTS_COLOR,
  RESULTS_DESCRIPTION,
  LETTER_CLASS,
  NOTIFICATION,
};
