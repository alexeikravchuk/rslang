export const REQUEST_WORDS = 'REQUEST-WORDS';
export const DELETE_WORD = 'DELETE-WORD';
export const SET_HARD_WORD = 'SET_HARD_WORD';
export const SET_LEARNED = 'SET_LEARNED';
export const REQUEST_WORD_INFO_SUCCESS = 'REQUEST_WORD_INFO_SUCCESS';
export const REQUEST_WORD_INFO = 'REQUEST_WORD_INFO';
export const RECOVER_FROM_DELETED = 'RECOVER_FROM_DELETED';
export const RECOVER_FROM_HARD = 'RECOVER_FROM_HARD';
export const RESET_CURRENT = 'RESET_CURRENT';

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

export const deleteWord = (setDeleteId) => {
  return ({
    type: DELETE_WORD,
    setDeleteId,
  });
};

export const setHardWord = (setHardId) => {
  return ({
    type: SET_HARD_WORD,
    setHardId,
  });
};

export const recoverFromDeleted = (recoveringId) => {
  return ({
    type: RECOVER_FROM_DELETED,
    recoveringId,
  });
};

export const recoverFromHard = (recoveringId) => {
  return ({
    type: RECOVER_FROM_HARD,
    recoveringId,
  });
};

export const resetCurrent = () => {
  return ({
    type: RESET_CURRENT,
  });
};

export const setLearned = () => {
  return ({
    type: SET_LEARNED,
  });
};
