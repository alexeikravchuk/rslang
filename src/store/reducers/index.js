import AppStateReducer from './appStateReducer';
import WordsReducer from './wordsReducer';
import { combineReducers } from 'redux'

const app = combineReducers(
  {
    AppStateReducer,
    WordsReducer
  }
)

export default app