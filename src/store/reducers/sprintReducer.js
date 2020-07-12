import {
  BASIC_XP,
  INITIAL_DIFFICULTY,
  INITIAL_ROUND,
  INITIAL_XP_LEVEL,
  INITIAL_XP_STEPPER_VALUE,
  XP_STEPPER_NUMBER
 } from '../../pages/SprintMiniGame/constants/constants'

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
  CLOSE_WINDOW,
  LEARNED_WORDS,
  WRONG_WORDS,
 } from '../actions';


const defaultState = {
  checked: false,
  open: true,
  disabled: false,
  difficulty: INITIAL_DIFFICULTY,
  round: INITIAL_ROUND,
  gameWords: [],
  learnedWords: new Set(),
  wrongWords: new Set(),
  userWords: false,
  gameLoading: false,
  showCard: false,
  wordIndex: 0,
  translateIndex: 0,
  answer: null,
  score: 0,
  scoreRecord: 0,
  totalScore: 0,
  gameCounter: 0,
  xp: BASIC_XP,
  xpLevel: INITIAL_XP_LEVEL,
  xpLevelStepper: INITIAL_XP_STEPPER_VALUE,
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
      return {
        ...state,
        gameWords: action.words,
        learnedWords: new Set(),
        wrongWords: new Set(),
        scoreRecord: action.stats.optional.sprint.rec,
        totalScore: action.stats.optional.sprint.score,
        gameCounter: action.stats.optional.sprint.count,
      };
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
        xpLevelStepper: (state.xpLevelStepper < XP_STEPPER_NUMBER && action.answer) ? state.xpLevelStepper + 1 : INITIAL_XP_STEPPER_VALUE,
      };
    }
    case LEARNED_WORDS: {
      return {
        ...state,
        learnedWords: state.wrongWords.has(action.payload) ? state.learnedWords : state.learnedWords.add(action.payload)
      };
    }
    case WRONG_WORDS: {
      return {
        ...state,
        wrongWords: state.wrongWords.add(action.payload),
        learnedWords: state.learnedWords.delete(action.payload) ? state.learnedWords : state.learnedWords
      };
    }
    case XP_LEVEL: {
      return {...state, xpLevel: action.payload};
    }
    case END_GAME: {
      return {...state,
       open: true,
       showCard: false,
       showStatistic: false,
       score: 0,
       xpLevel: INITIAL_XP_LEVEL,
       xpLevelStepper: INITIAL_XP_STEPPER_VALUE,
      };
    }
    case TIMER_FINISHED: {
      return {
        ...state,
        showStatistic: true,
        showCard: false,
        scoreRecord: Math.max(state.score, state.scoreRecord),
        totalScore: state.totalScore + state.score,
        gameCounter: state.gameCounter + 1,
      };
    }
    case CLOSE_WINDOW: {
      return {...state,
        open: false,
        showCard: false,
        showStatistic: false,
        score: 0,
        xpLevel: INITIAL_XP_LEVEL,
        xpLevelStepper: INITIAL_XP_STEPPER_VALUE,
      };
    }
    default: {
      return {...state};
    }
  }
}

export default sprintReducer
