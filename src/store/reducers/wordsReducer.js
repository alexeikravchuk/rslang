import {templateWord} from '../../components/Dictionary/assets/template';
import {SET_HARD_WORD, DELETE_WORD, SET_LEARNED} from '../actions';
import {
  RECOVER_FROM_DELETED,
  RECOVER_FROM_HARD,
  REQUEST_WORD_INFO,
  REQUEST_WORD_INFO_SUCCESS, RESET_CURRENT,
} from '../actions/wordsAction';

const template = {
  id: '5e9f5ee35eb9e72bc21af4a1',
  word: 'Learn English',
  image: templateWord.image,
  transcription: 'with fun',
  wordTranslate: 'it not hard',
};

const defaultState = {
    hardWords: [],
    learnedWords: [{word: 'agree', id: '5e9f5ee35eb9e72bc21af4a1'}, {word: 'alcohol', id: '5e9f5ee35eb9e72bc21af4a0'}],
    deletedWords: [],
    newWords: [],
    currentWord: template,
    loadingWord: false,
  }
;

const getSearchIndex = (array, search) => {
  return array.findIndex((item) => {
    return (item.id === search);
  });
};

const returnArrayItemByIndex = (array, searchId) => {
  const index = getSearchIndex(array, searchId);
  return array.slice(index, index + 1)[0];
};

const removeArrayElement = (array, index) => {
  return array.splice(index, 1);
};

const returnWordObj = (array, search) => {
  const index = getSearchIndex(array, search);
  return removeArrayElement(array, index)[0];
};

const wordReducer = (state = defaultState, action) => {
    switch (action.type) {
      case SET_HARD_WORD: {
        const copyHard = state.hardWords.slice();
        copyHard.push(returnArrayItemByIndex(state.learnedWords, action.setHardId));
        return {
          ...state,
          learnedWords: state.learnedWords.filter((item) => item.id !== action.setHardId),
          hardWords: copyHard,
        };
      }
      case
      DELETE_WORD: {
        const copyDelete = state.deletedWords.slice();
        copyDelete.push(returnArrayItemByIndex(state.learnedWords, action.setDeleteId));
        return {
          ...state,
          learnedWords: state.learnedWords.filter((item) => item.id !== action.setDeleteId),
          deletedWords: copyDelete,
        };
      }
      case
      RECOVER_FROM_DELETED: {
        const copyLearned = state.learnedWords.slice();
        copyLearned.push(returnArrayItemByIndex(state.deletedWords, action.recoveringId));
        return {
          ...state,
          learnedWords: copyLearned,
          deletedWords: state.deletedWords.filter((item) => item.id !== action.recoveringId),
        };
      }
      case RECOVER_FROM_HARD: {
        const copyLearned = state.learnedWords.slice();
        copyLearned.push(returnArrayItemByIndex(state.hardWords, action.recoveringId));
        return {
          ...state,
          learnedWords: copyLearned,
          hardWords: state.hardWords.filter((item) => item.id !== action.recoveringId),
        };
      }
      case RESET_CURRENT: {
        return {
          ...state,
          currentWord: template,
        };
      }
      case
      SET_LEARNED: {
        return {...state};
      }
      case
      REQUEST_WORD_INFO: {
        return {...state, loadingWord: true};
      }
      case
      REQUEST_WORD_INFO_SUCCESS: {
        return {...state, currentWord: action.word, loadingWord: false};
      }
      default: {
        return {...state};
      }
    }
  }
;

export default wordReducer;
