import appStateReducer from './appStateReducer';
import wordsReducer from './wordsReducer';
import sprintReducer from './sprintReducer';
import { combineReducers } from 'redux';

export default combineReducers({ appStateReducer, wordsReducer, sprintReducer })
