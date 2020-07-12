import { getButtonsInfo } from './getButtonsInfo';

import { MAX_LEVEL, SENTENCE_STATUS, BUTTONS_NAME } from '../constants/constants';
import { getTipsSettings } from './getTipsSettings';

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
    shownButtons: getButtonsInfo([BUTTONS_NAME.DONT_KNOW]),
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
