import {SET_HARD_WORD, DELETE_WORD, SET_LEARNED} from '../actions';
import {REQUEST_WORD_INFO, REQUEST_WORD_INFO_SUCCESS} from '../actions/wordsAction';

const defaultState = {
    hardWords: [{word: 'agree', id: '5e9f5ee35eb9e72bc21af4a1'}, {word: 'alcohol', id: '5e9f5ee35eb9e72bc21af4a0'},
      {word: 'agree', id: '5e9f5ee35eb9e72bc21af4a1'}, {word: 'alcohol', id: '5e9f5ee35eb9e72bc21af4a0'}, {
        word: 'agree',
        id: '5e9f5ee35eb9e72bc21af4a1',
      }, {word: 'alcohol', id: '5e9f5ee35eb9e72bc21af4a0'}],
    learnedWords: [{word: 'agree', id: '5e9f5ee35eb9e72bc21af4a1'}, {word: 'alcohol', id: '5e9f5ee35eb9e72bc21af4a0'}],
    deletedWords: [{word: 'agree', id: '5e9f5ee35eb9e72bc21af4a1'}, {word: 'alcohol', id: '5e9f5ee35eb9e72bc21af4a0'}],
    newWords: [],
    currentWord: '',
    loadingWord: false,
  }
;

const wordReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_HARD_WORD: {
      return {...state};
    }
    case DELETE_WORD: {
      return {...state};
    }
    case REQUEST_WORD_INFO: {
      return {...state, loadingWord: true};
    }
    case REQUEST_WORD_INFO_SUCCESS: {
      return {...state, currentWord: action.word, loadingWord: false};
    }
    case SET_LEARNED: {
      return {...state};
    }
    default: {
      return {...state};
    }
  }
};

export default wordReducer;
