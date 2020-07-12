import { LOAD_STATISTICS, SAVE_STATISTICS } from '../actions/statisticsActions';

const initialState = {
  learnedWords: 0,
  optional: {
    speakIt: {},
    puzzle: {},
    sprint: {},
  },
};

export const statisticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_STATISTICS:
      return { ...state, optional: action.payload };
    case SAVE_STATISTICS:
      return { ...state, optional: action.payload };
    default:
      return state;
  }
};
