const MAX_LEVEL = 6;
const WORDS_PER_PAGE = 10;
const WORDS_PER_SENTENCE = 10;
const BACKGROUND_DEFAULT = './assets/img/background_default.jpg';
const BLANK_IMG = './images/paintings/blank.jpg';

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
  DONT_KNOW: 'know',
  CHECK: 'check',
  CONTINUE: 'continue',
  RESULTS: 'results',
  STATISTICS: 'statistics',
  TRY_AGAIN: 'try again',
};

export {
  MAX_LEVEL,
  WORDS_PER_PAGE,
  WORDS_PER_SENTENCE,
  BACKGROUND_DEFAULT,
  ROW_TYPE,
  BLANK_IMG,
  SENTENCE_STATUS,
  BUTTONS_NAME,
};
