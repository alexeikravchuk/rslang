const ADD_NEW_WORDS = 'ADD_NEW_WORDS'
const ADD_LEARNED_WORDS = 'ADD_LEARNED_WORDS'
const ADD_MISSED_WORDS = 'ADD_MISSED_WORDS'
const LOAD_WORDS = 'LOAD_WORDS'
const LOAD_WORDS_SUCCESS = 'LOAD_WORDS_SUCCESS'

const loadWords = () => {
  return (
    {
      type: LOAD_WORDS,
    }
  )
}

const loadWordsSuccess = (words) => {
  return (
    {
      type: LOAD_WORDS_SUCCESS,
      words
    }
  )
}

const addWords = () => {
  return (
    {
      type: ADD_NEW_WORDS,
    }
  )
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
  addWords,
  addLearnedWords,
  addMissedWords,
  loadWords,
  loadWordsSuccess}
