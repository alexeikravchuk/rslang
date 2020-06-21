import { ADD_NEW_WORDS, ADD_LEARNED_WORDS, ADD_MISSED_WORDS } from '../actions';

const defaultState = {
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
