export const HIDE_WELCOME_DIALOG = 'HIDE_WELCOME_DIALOG';
export const USER_WORDS = 'USE_USER_WORDS';
export const CHANGE_DIFFICULTY = 'CHANGE_DIFFICULTY';
export const LOAD_GAME = 'LOAD_GAME';
export const SHOW_LOADER = 'SHOW_LOADER';
export const HIDE_LOADER = 'HIDE_LOADER';
export const SHOW_CARD = 'SHOW_CARD';
export const CHECK_ANSWER = 'CHECK_ANSWER';
export const XP_LEVEL = 'XP_LEVEL';
export const END_GAME = 'END_GAME';
export const CHANGE_ROUND = 'CHANGE_ROUND';
export const TIMER_FINISHED = 'TIMER_FINISHED';

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

export const changeRound = (round) => {
  return ({
    type: CHANGE_ROUND,
    payload: round,
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

  if (Math.random() < 0.7) {
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

export const loadGame = (difficulty, round) => {
  return async dispatch => {
    dispatch(hideWelcomeDialog())
    dispatch(showLoader())
    const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${round}&group=${difficulty - 1}`
    const response = await fetch(url)
    const words = await response.json()
    setTimeout(() => {
      dispatch({ type: LOAD_GAME, payload: words, })
      dispatch(hideLoader())
      playSound('gameStart')
      dispatch(showCard(words.length))
    }, 1200)
  }
}

export const checkAnswer = (btnValue, sprintState) => {
  const { wordIndex, translateIndex, gameWords, xpLevel, xpLevelStepper } = sprintState
  return dispatch => {
    if (btnValue === 'right') {
      if (wordIndex === translateIndex) {
        dispatch ({
          type: CHECK_ANSWER,
          answer: true,
        })
        playSound('correct')
        dispatch(xpLevelToggle(true, xpLevel, xpLevelStepper))
      } else {
        dispatch ({
          type: CHECK_ANSWER,
          answer: false,
        })
        playSound('error')
        dispatch(xpLevelToggle(false, xpLevel, xpLevelStepper))
      }
    } else if (btnValue === 'wrong') {
      if (wordIndex === translateIndex) {
        dispatch ({
          type: CHECK_ANSWER,
          answer: false,
        })
        playSound('error')
        dispatch(xpLevelToggle(false, xpLevel, xpLevelStepper))
      } else {
        dispatch ({
          type: CHECK_ANSWER,
          answer: true,
        })
        playSound('correct')
        dispatch(xpLevelToggle(true, xpLevel, xpLevelStepper))
      }
    }
    dispatch(showCard(gameWords.length))
  }
}

const playSound = (sound) => {
  const audio = new Audio(`${process.env.PUBLIC_URL}/audio/${sound}.mp3`)
  audio.play()
}

export const xpLevelToggle = (answer, xpLevel, xpLevelStepper) => {
  if (answer) {
    if (xpLevelStepper < 2) {
      return ({
        type: XP_LEVEL,
        payload: xpLevel,
      })
    } else {
      xpLevel < 8 && playSound('levelUp')
      return ({
        type: XP_LEVEL,
        payload: xpLevel < 8 ? xpLevel * 2 : xpLevel,
      })
    }
  } else {
    return ({
      type: XP_LEVEL,
      payload: 1,
    })
  }
}

export const endGame = () => {
  return ({
    type: END_GAME,
  })
}

export const isTimerFinished = () => {
  return ({
    type: TIMER_FINISHED,
  })
}

