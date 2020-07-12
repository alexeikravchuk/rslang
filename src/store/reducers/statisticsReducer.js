import { STATISTICS } from '../actions/statisticsActions';

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
    case STATISTICS:
      return { ...state, optional: action.payload };
    default:
      return state;
  }
};
