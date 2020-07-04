import {
  START_SOUND,
  END_SOUND,
  CORRECT_ANSWER_SOUND,
  WRONG_ANSWER_SOUND,
  LEVEL_UP_SOUND,
  RIGHT_BTN_VALUE,
  WRONG_BTN_VALUE,
  MAX_XP_LEVEL,
  XP_STEPPER_NUMBER,
  RIGHT_CARD_CHANCE,
  SERVER_URL,
} from '../../pages/SprintMiniGame/constants/constants'
import { playSound } from '../../pages/SprintMiniGame/utils/playSound'

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
export const CLOSE_WINDOW = 'CLOSE_WINDOW';
export const ADD_LEARNED_WORDS = 'LEARNED_WORDS';
export const ADD_WRONG_WORDS = 'CLOSE_WINDOW';


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

  if (Math.random() < RIGHT_CARD_CHANCE) {
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

export const getUserWords = async (id, token) => {
  await fetch(`${SERVER_URL}users/${id}/words`, {
    method: 'GET',
    withCredentials: true,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    }
  }
  )
    .then(response => {
      if (response.status === 404) {
        throw new Error('404');
      } else {
        return response.json()
      }
    })
}

export const getCommonWords = async (difficulty, round) => {
    const url = `${SERVER_URL}words?page=${round - 1}&group=${difficulty - 1}`
    const response = await fetch(url)
    const words = await response.json()
    return words
}

export const loadGame = (userWords, difficulty, round, id, token) => {
  return async dispatch => {
    dispatch(hideWelcomeDialog())
    dispatch(showLoader())
    let words
    if (userWords) {
      try {
        words = await getUserWords(id, token)
      } catch (e) {
        words = await getCommonWords(difficulty, round)
      }
    } else {
      words = await getCommonWords(difficulty, round)
    }
    setTimeout(() => {
      dispatch({ type: LOAD_GAME, payload: words })
      dispatch(hideLoader())
      playSound(START_SOUND)
      dispatch(showCard(words.length))
    }, 1000)
  }
}

export const addLearnedWord = (wordIndex) => {
  return ({
    type: ADD_LEARNED_WORDS,
    payload: wordIndex,
  })
}

export const addWrongWord = (wordIndex) => {
  return ({
    type: ADD_WRONG_WORDS,
    payload: wordIndex,
  })
}

export const checkAnswer = (btnValue, sprintState) => {
  const { wordIndex, translateIndex, gameWords, xpLevel, xpLevelStepper } = sprintState
  return dispatch => {
    if (btnValue === RIGHT_BTN_VALUE) {
      if (wordIndex === translateIndex) {
        dispatch ({
          type: CHECK_ANSWER,
          answer: true,
        })
        playSound(CORRECT_ANSWER_SOUND)
        dispatch(addLearnedWord(wordIndex))
        dispatch(xpLevelToggle(true, xpLevel, xpLevelStepper))
      } else {
        dispatch ({
          type: CHECK_ANSWER,
          answer: false,
        })
        playSound(WRONG_ANSWER_SOUND)
        dispatch(addWrongWord(wordIndex))
        dispatch(xpLevelToggle(false, xpLevel, xpLevelStepper))
      }
    } else if (btnValue === WRONG_BTN_VALUE) {
      if (wordIndex === translateIndex) {
        dispatch ({
          type: CHECK_ANSWER,
          answer: false,
        })
        playSound(WRONG_ANSWER_SOUND)
        dispatch(addWrongWord(wordIndex))
        dispatch(xpLevelToggle(false, xpLevel, xpLevelStepper))
      } else {
        dispatch ({
          type: CHECK_ANSWER,
          answer: true,
        })
        playSound(CORRECT_ANSWER_SOUND)
        dispatch(addLearnedWord(wordIndex))
        dispatch(xpLevelToggle(true, xpLevel, xpLevelStepper))
      }
    }
    dispatch(showCard(gameWords.length))
  }
}

export const xpLevelToggle = (answer, xpLevel, xpLevelStepper) => {
  if (answer) {
    if (xpLevelStepper < XP_STEPPER_NUMBER) {
      return ({
        type: XP_LEVEL,
        payload: xpLevel,
      })
    } else {
      xpLevel < MAX_XP_LEVEL && playSound(LEVEL_UP_SOUND)
      return ({
        type: XP_LEVEL,
        payload: xpLevel < MAX_XP_LEVEL ? xpLevel * XP_STEPPER_NUMBER : xpLevel,
      })
    }
  } else {
    return ({
      type: XP_LEVEL,
      payload: 1,
    })
  }
}

export const closeWindow = () => {
  return ({
    type: CLOSE_WINDOW,
  })
}

export const endGame = () => {
  return ({
    type: END_GAME,
  })
}

export const isTimerFinished = () => {
  playSound(END_SOUND)
  return dispatch => {
    dispatch ({
      type: TIMER_FINISHED,
    })
  }
}
