import { ADD_NEW_WORDS,
  ADD_LEARNED_WORDS,
  ADD_MISSED_WORDS,
  LOAD_WORDS,
  LOAD_WORDS_SUCCESS } from '../actions/savannahAction';

const defaultState = {
  loading: false,
  error: null,
  newWords: [],
  learnedWords: [],
  missedWords: [],
  currentWord:{
    word: '',
    translate: '',
  },
}

const savannahReducer = ( state = defaultState, action) => {
  switch (action.type) {
    case LOAD_WORDS: {
      return { ...state, loading: true, error: null}
    }
    case LOAD_WORDS_SUCCESS: {
      return { ...state, newWords: action.words , loading: false, error: null}
    }
    case ADD_NEW_WORDS: {
      return {...state};
    }
    case ADD_LEARNED_WORDS:{
      return {...state};
    }
    case ADD_MISSED_WORDS: {
      return {...state}
    }
    default: {
      return {...state};
    }
  }
}

export { savannahReducer }
