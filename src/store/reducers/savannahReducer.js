import {
  ADD_NEW_WORDS,
  ADD_LEARNED_WORDS,
  ADD_MISSED_WORDS,
  LOAD_WORDS,
  LOAD_WORDS_SUCCESS,
  GAME_STARTING,
  LIFE_DECREASE,
  GAME_END
} from '../actions/savannahAction';

const defaultState = {
  gameStarted: false,
  gameEnd:false,
  loading: false,
  error: null,
  lifeCounter: 5,
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
    case GAME_STARTING: {
      return {...state, gameStarted: true}
    }
    case GAME_END: {
      return {...state, gameEnd: true}
    }
    case LOAD_WORDS: {
      return { ...state, loading: true, error: null}
    }
    case LOAD_WORDS_SUCCESS: {
      return { ...state, newWords: action.words , loading: false, error: null}
    }
    case LIFE_DECREASE: {
      return { ...state,
        lifeCounter: (state.lifeCounter === 0) ? 0 : state.lifeCounter-1}
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
