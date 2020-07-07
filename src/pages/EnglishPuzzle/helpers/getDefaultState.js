import { getButtonsInfo } from './getButtonsInfo';

const { MAX_LEVEL, SENTENCE_STATUS } = require('../constants/constants');
const { getTipsSettings } = require('./getTipsSettings');

const getDefaultState = () => {
  return {
    level: {
      current: +localStorage.level || 1,
      maxLevel: MAX_LEVEL,
    },
    page: {
      current: +localStorage.page || 1,
      maxPage: 50,
    },
    activeTips: getTipsSettings(),
    shownButtons: [getButtonsInfo()[0]],
    words: [],
    results: [],
    currentSentence: 1,
    sentenceStatus: SENTENCE_STATUS.PENDING,
    isCorrectOrder: [],
    puzzles: [],
    whitePuzzles: [],
    puzzleResults: new Array(10).fill([]),
    draggablePuzzle: null,
    painting: null,
    isShowResults: false,
  };
};

export { getDefaultState };
