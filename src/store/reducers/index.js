import appStateReducer from './appStateReducer';
import authReducer from './authReducer';
import wordsReducer from './wordsReducer';
import { combineReducers } from 'redux'

export default combineReducers({ appStateReducer, wordsReducer, authReducer })
