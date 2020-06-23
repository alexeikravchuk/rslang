import {
  HIDE_WELCOME_DIALOG,
  USER_WORDS,
  CHANGE_DIFFICULTY,
  LOAD_GAME,
  SHOW_LOADER,
  HIDE_LOADER,
  SHOW_CARD,
  CHECK_ANSWER,
  TIMER,
 } from '../actions';

const defaultState = {
  checked: false,
  open: true,
  disabled: false,
  difficulty: null,
  gameWords: [],
  userWords: false,
  gameLoading: false,
  showCard: false,
  wordIndex: 0,
  translateIndex: 0,
  answer: null,
  score: 0,
  xp: 10,
  roundDuration: 60,
  showStatistic: true
}

const sprintReducer = ( state = defaultState, action) => {
  switch (action.type) {
    case HIDE_WELCOME_DIALOG: {
      return {...state, open: false};
    }
    case USER_WORDS: {
      return {...state, checked: !state.checked, disabled: !state.disabled, userWords: !state.userWords};
    }
    case CHANGE_DIFFICULTY: {
      return {...state, difficulty: action.payload};
    }
    case LOAD_GAME: {
      return {...state, gameWords: action.payload};
    }
    case SHOW_LOADER: {
      return {...state, gameLoading: true};
    }
    case HIDE_LOADER: {
      return {...state, gameLoading: false};
    }
    case SHOW_CARD: {
      return {...state, showCard: true, wordIndex: action.wordIndx, translateIndex: action.translateIndx};
    }
    case CHECK_ANSWER: {
      return {
        ...state,
        answer: action.answer,
        score: state.score + action.xp,
      };
    }
    case TIMER: {
      return {
        ...state,
        roundDuration: state.roundDuration--
      };
    }
    default: {
      return {...state};
    }
  }
}

export default sprintReducer
