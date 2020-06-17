import { RESET_DAY_COUNTER, ADD_DAY_COUNTER, SET_SETTINGS, LOAD_SETTINGS} from '../actions';

const defaultState = {
  wordDayCounter: 5,
}

const appStateReducer = ( state = defaultState, action) => {
  switch (action.type) {
    case RESET_DAY_COUNTER: {
      return state
    }
    case ADD_DAY_COUNTER:{
      return state
    }
    case LOAD_SETTINGS: {
      return state
    }
    case SET_SETTINGS: {
      return state
    }
    default: {
      return state
    }
  }
}

export default {
  appStateReducer,
}
