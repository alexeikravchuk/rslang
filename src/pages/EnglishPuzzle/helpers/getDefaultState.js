const { MAX_LEVEL } = require('../constants/constants');
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
    words: [],
    currentSentence: 1,
    puzzles: null,
    puzzleResults: new Array(10).fill([]),
    draggablePuzzle: null,
    painting: null,
  };
};

export { getDefaultState };
