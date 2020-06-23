const ADD_NEW_WORDS = 'ADD_NEW_WORDS'
const ADD_LEARNED_WORDS = 'ADD_LEARNED_WORDS'
const ADD_MISSED_WORDS = 'ADD_MISSED_WORDS'
const LOAD_WORDS = 'LOAD_WORDS'
const LOAD_WORDS_SUCCESS = 'LOAD_WORDS_SUCCESS'
const GAME_STARTING = 'GAME_STARTING'
const LIFE_DECREASE = 'LIFE_DECREASE'
const GAME_END = 'GAME_END'

const loadWords = () => {
  return (
    {
      type: LOAD_WORDS,
    }
  )
}

const gameStarting = () => {
  return (
    {
      type: GAME_STARTING,
    }
  )
}

const gameEnding = () => {
  return {
    type: GAME_END,
  }
}

const loadWordsSuccess = (words) => {
  return (
    {
      type: LOAD_WORDS_SUCCESS,
      words
    }
  )
}

const lifeDecrease = () => {
  return {type: LIFE_DECREASE}
}


const addLearnedWords = () => {
  return (
    {
      type: ADD_LEARNED_WORDS,
    }
  )
}

const addMissedWords = () => {
  return (
    {
      type: ADD_MISSED_WORDS,
    }
  )
}

export { ADD_NEW_WORDS,
  ADD_LEARNED_WORDS,
  ADD_MISSED_WORDS,
  LOAD_WORDS,
  LOAD_WORDS_SUCCESS,
  GAME_STARTING,
  GAME_END,
  LIFE_DECREASE,
  addLearnedWords,
  addMissedWords,
  loadWords,
  loadWordsSuccess,
  gameStarting,
  gameEnding,
  lifeDecrease}
