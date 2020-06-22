import { HIDE_WELCOME_DIALOG, USER_WORDS, CHANGE_DIFFICULTY, LOAD_GAME, SHOW_LOADER, HIDE_LOADER } from '../actions';

const defaultState = {
  checked: false,
  open: true,
  disabled: false,
  difficulty: null,
  gameWords: [],
  gameLoading: false,
}

const sprintReducer = ( state = defaultState, action) => {
  switch (action.type) {
    case HIDE_WELCOME_DIALOG: {
      return {...state, open: false};
    }
    case USER_WORDS: {
      return {...state, checked: !state.checked, disabled: !state.disabled};
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
    default: {
      return {...state};
    }
  }
}

export default sprintReducer
