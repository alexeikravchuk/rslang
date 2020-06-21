const ADD_NEW_WORDS = 'ADD_NEW_WORDS'
const ADD_LEARNED_WORDS = 'ADD_LEARNED_WORDS'
const ADD_MISSED_WORDS = 'ADD_MISSED_WORDS'

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
  addWords,
  addLearnedWords,
  addMissedWords}
