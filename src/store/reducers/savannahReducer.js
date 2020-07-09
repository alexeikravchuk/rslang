import {
  ADD_NEW_WORDS,
  ADD_LEARNED_WORDS,
  ADD_MISSED_WORDS,
  LOAD_WORDS,
  LOAD_WORDS_SUCCESS,
  GAME_STARTING,
  LIFE_DECREASE,
  GAME_END,
  RESET_GAME,
  DIFFICULTY_CHANGE, REMOVE_WORD, LEVEL_UP
} from '../actions/savannahAction';
import {shuffleArray} from "../../pages/Savannah/utils/utils";

const defaultState = {
  gameStarted: false,
  gameEnd:false,
  loading: false,
  reloading: false,
  error: null,
  difficulty: 0,
  lifeCounter: 5,
  gameLevel: 0,
  newWords: [],
  learnedWords: [],
  missedWords: [],
  currentWord:{},
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
      return { ...state, newWords: state.newWords.concat(shuffleArray(action.words)), loading: false, error: null}
    }
    case LIFE_DECREASE: {
      return { ...state,
        lifeCounter: (state.lifeCounter === 0) ? 0 : state.lifeCounter-1}
    }
    case DIFFICULTY_CHANGE: {
      return {...state, difficulty: action.difficulty}
    }
    case ADD_NEW_WORDS: {
      return {...state};
    }
    case ADD_LEARNED_WORDS:{
      return {...state, learnedWords: state.learnedWords.concat(action.word)}
    }
    case ADD_MISSED_WORDS: {
      return {...state, missedWords: state.missedWords.concat(action.word)}
    }
    case RESET_GAME: {
      return defaultState;
    }
    case REMOVE_WORD: {
      return { ...state, newWords: state.newWords.slice(1)}
    }
    case LEVEL_UP: {
      return { ...state, gameLevel: (state.gameLevel === 30) ?  30 : state.gameLevel + 1}
    }
    default: {
      return {...state};
    }
  }
}

export { savannahReducer }
