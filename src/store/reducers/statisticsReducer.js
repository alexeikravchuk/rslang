import { STATISTICS } from '../actions/statisticsActions';

const initialState = {
  learnedWords: 0,
  optional: {
    speakIt: {},
    puzzle: {},
    sprint: { scoreRecord: 0, totalScore: 0, gameCounter: 0 },
  },
};

export const statisticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case STATISTICS:
      return { ...state, optional: { ...state.optional, ...action.payload } };
    default:
      return state;
  }
};
