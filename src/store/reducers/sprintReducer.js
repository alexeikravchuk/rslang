import {
  HIDE_WELCOME_DIALOG,
  USER_WORDS,
  CHANGE_DIFFICULTY,
  LOAD_GAME,
  SHOW_LOADER,
  HIDE_LOADER,
  SHOW_CARD,
  CHECK_ANSWER,
  XP_LEVEL,
  END_GAME,
  CHANGE_ROUND,
  TIMER_FINISHED,
 } from '../actions';

const defaultState = {
  checked: false,
  open: true,
  disabled: false,
  difficulty: 2,
  round: 1,
  gameWords: [],
  userWords: false,
  gameLoading: false,
  showCard: false,
  wordIndex: 0,
  translateIndex: 0,
  answer: null,
  score: 0,
  xp: 10,
  xpLevel: 1,
  xpLevelStepper: -1,
  showStatistic: false,
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
    case CHANGE_ROUND: {
      return {...state, round: action.payload};
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
        score: action.answer ? state.score + state.xp * state.xpLevel : state.score,
        xpLevelStepper: (state.xpLevelStepper < 2 && action.answer) ? state.xpLevelStepper + 1 : -1,
      };
    }
    case XP_LEVEL: {
      return {...state, xpLevel: action.payload};
    }
    case END_GAME: {
      return {...state, open: true, showCard: false, showStatistic: false};
    }
    case TIMER_FINISHED: {
      return {...state, showStatistic: true, showCard: false};
    }
    default: {
      return {...state};
    }
  }
}

export default sprintReducer
