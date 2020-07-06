import { getButtonsInfo } from './getButtonsInfo';

const { MAX_LEVEL, SENTENCE_STATUS } = require('../constants/constants');
const { getTipsSettings } = require('./getTipsSettings');

const getDefaultState = () => {
  return {
    level: {
      current: 1,
      maxLevel: MAX_LEVEL,
    },
    page: {
      current: 1,
      maxPage: 1,
    },
    activeTips: getTipsSettings(),
    shownButtons: [getButtonsInfo()[0]],
    words: [],
    currentSentence: 1,
    sentenceStatus: SENTENCE_STATUS.PENDING,
    isCorrectOrder: [],
    puzzles: [],
    whitePuzzles: [],
    puzzleResults: new Array(10).fill([]),
    draggablePuzzle: null,
    painting: null,
  };
};

export { getDefaultState };
