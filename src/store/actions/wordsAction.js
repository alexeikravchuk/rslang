const REQUEST_WORDS = 'REQUEST-WORDS';
const DELETE_WORD = 'DELETE-WORD';
const SET_HARD_WORD = 'SET_HARD_WORD';
const SET_LEARNED = 'SET_LEARNED';

// async fetch words from server
export const loadWords = (requestWords) => {
  return ({
    type: REQUEST_WORDS,
    requestWords,
  })
};

export const deleteWord = (deleteFunc) => {
  return ({
    type: DELETE_WORD,
    deleteFunc,
  })
};

export const setHardWord = (setHard) => {
  return ({
    type: SET_HARD_WORD,
    setHard,
  })
}

export const setLearned = () => {
  return ({
    type: SET_LEARNED,
  })
}

