import { SET_HARD_WORD, DELETE_WORD, REQUEST_WORDS, SET_LEARNED} from '../actions'

const defaultState = {
  hardWords: [],
  learnedWords: [],
  deletedWords: [],
  newWords: [],
}

const wordReducer = ( state = defaultState, action) => {
  switch (action.type) {
    case SET_HARD_WORD: {
      return state
    }
    case DELETE_WORD:{
      return state
    }
    case REQUEST_WORDS: {
      return state
    }
    case SET_LEARNED: {
      return state
    }
    default: {
      return state
    }
  }
}

export default {
  wordReducer,
}
