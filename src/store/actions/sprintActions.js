export const HIDE_WELCOME_DIALOG = 'HIDE_WELCOME_DIALOG';
export const USER_WORDS = 'USE_USER_WORDS';
export const CHANGE_DIFFICULTY = 'CHANGE_DIFFICULTY';
export const LOAD_GAME = 'LOAD_GAME';
export const SHOW_LOADER = 'SHOW_LOADER';
export const HIDE_LOADER = 'HIDE_LOADER';
export const SHOW_CARD = 'SHOW_CARD';
export const CHECK_ANSWER = 'CHECK_ANSWER';

export const hideWelcomeDialog = () => {
  return ({
    type: HIDE_WELCOME_DIALOG,
  })
}

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

export const showLoader = () => {
  return ({
    type: SHOW_LOADER,
  })
}

export const hideLoader = () => {
  return ({
    type: HIDE_LOADER,
  })
}

export const showCard = (maxIndx) => {

  function getRandomIndex(max) {
    const min = 0;
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min
  }

  if (Math.random() < 0.4) {
    const index = getRandomIndex(maxIndx);
    return ({
      type: SHOW_CARD,
      wordIndx: index,
      translateIndx: index
    })
  }

  return ({
    type: SHOW_CARD,
    wordIndx: getRandomIndex(maxIndx),
    translateIndx: getRandomIndex(maxIndx)
  })
}

export const loadGame = () => {
  return async dispatch => {
    dispatch(hideWelcomeDialog())
    dispatch(showLoader())
    const url = 'https://afternoon-falls-25894.herokuapp.com/words?page=2&group=0'
    const response = await fetch(url)
    const words = await response.json()
    setTimeout(() => {
      dispatch({ type: LOAD_GAME, payload: words, })
      dispatch(hideLoader())
      dispatch(showCard(words.length))
    }, 2000)
  }
}

export const checkAnswer = (wordIndx, translateIndx, btnValue, wordsAmount, xp) => {
  console.log(wordIndx, translateIndx, btnValue, wordsAmount)
  return dispatch => {
    if (btnValue === 'right') {
      if (wordIndx === translateIndx) {
        dispatch ({
          type: CHECK_ANSWER,
          answer: true,
          xp,
        })
      } else{
        dispatch ({
          type: CHECK_ANSWER,
          answer: false,
          xp: 0,
        })
      }
    } else if (btnValue === 'wrong') {
      if (wordIndx === translateIndx) {
        dispatch ({
          type: CHECK_ANSWER,
          answer: false,
          xp: 0,
        })
      } else {
        dispatch ({
          type: CHECK_ANSWER,
          answer: true,
          xp,
        })
      }
    }
    dispatch(showCard(wordsAmount))
  }
}
