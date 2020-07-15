export const REQUEST_WORDS = 'REQUEST-WORDS';
export const DELETE_WORD = 'DELETE-WORD';
export const SET_HARD_WORD = 'SET_HARD_WORD';
export const SET_LEARNED = 'SET_LEARNED';
export const REQUEST_WORD_INFO_SUCCESS = 'REQUEST_WORD_INFO_SUCCESS';
export const REQUEST_WORD_INFO = 'REQUEST_WORD_INFO';

export const requestWordInfo = () => {
  return ({
    type: REQUEST_WORD_INFO,
  });
};

export const requestWordInfoSuccess = (word) => {
  return (
    {
      type: REQUEST_WORD_INFO_SUCCESS,
      word,
    }
  );
};

export const deleteWord = (deleteFunc) => {
  return ({
    type: DELETE_WORD,
    deleteFunc,
  });
};

export const setHardWord = (setHard) => {
  return ({
    type: SET_HARD_WORD,
    setHard,
  });
};

export const setLearned = () => {
  return ({
    type: SET_LEARNED,
  });
};
