export const HIDE_WELCOME_DIALOG = 'HIDE_WELCOME_DIALOG';
export const USER_WORDS = 'USE_USER_WORDS';
export const CHANGE_DIFFICULTY = 'CHANGE_DIFFICULTY';
export const LOAD_GAME = 'LOAD_GAME';
export const SHOW_LOADER = 'SHOW_LOADER';
export const HIDE_LOADER = 'HIDE_LOADER';



export const userWords = () => {
  return ({
    type: USER_WORDS,
  })
}

export const changeDifficulty = (difficulty) => {
  return ({
    type: CHANGE_DIFFICULTY,
    payload: difficulty,
  })
}

export const loadGame = () => {
  return async dispatch => {
    const url = 'https://afternoon-falls-25894.herokuapp.com/words?page=2&group=0'
    const response = await fetch(url)
    const words = await response.json()
    dispatch({ type: LOAD_GAME, payload: words, })
  }
}


