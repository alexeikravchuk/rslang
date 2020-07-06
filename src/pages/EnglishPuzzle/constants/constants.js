const MAX_LEVEL = 6;
const WORDS_PER_PAGE = 10;
const WORDS_PER_SENTENCE = 10;
const BACKGROUND_DEFAULT = './assets/img/background_default.jpg';
const BLANK_IMG = './images/paintings/blank.jpg';
const DATA_SRC = 'https://raw.githubusercontent.com/alexeikravchuk/rslang-data/master/';
const BACKEND_URL = 'https://afternoon-falls-25894.herokuapp.com';

const ROW_TYPE = {
  RESULT: 'result',
  RAW: 'raw',
};

const SENTENCE_STATUS = {
  PENDING: 'pending',
  READY: 'ready',
  SUCCESS: 'success',
  ERROR: 'error',
  FINISH: 'finish',
};

const BUTTONS_NAME = {
  DONT_KNOW: 'KNOW',
  CHECK: 'CHECK',
  CONTINUE: 'CONTINUE',
  RESULTS: 'RESULTS',
};

export {
  MAX_LEVEL,
  WORDS_PER_PAGE,
  WORDS_PER_SENTENCE,
  BACKGROUND_DEFAULT,
  DATA_SRC,
  ROW_TYPE,
  BACKEND_URL,
  BLANK_IMG,
  SENTENCE_STATUS,
  BUTTONS_NAME,
};
