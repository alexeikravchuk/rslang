import appStateReducer from './appStateReducer';
import wordsReducer from './wordsReducer';
import { combineReducers } from 'redux'

export default combineReducers({ appStateReducer, wordsReducer })
