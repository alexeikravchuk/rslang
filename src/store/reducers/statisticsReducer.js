import { STATISTICS, initialState } from '../actions/statisticsActions';

export const statisticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case STATISTICS:
      return { ...state, optional: { ...state.optional, ...action.payload } };
    default:
      return state;
  }
};
