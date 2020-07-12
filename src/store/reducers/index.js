import appStateReducer from './appStateReducer';
import authReducer from './authReducer';
import wordsReducer from './wordsReducer';
import { savannahReducer } from './savannahReducer';
import { combineReducers } from 'redux';
import sprintReducer from './sprintReducer';
import { statisticsReducer } from './statisticsReducer';

export default combineReducers({
  appStateReducer,
  wordsReducer,
  authReducer,
  sprintReducer,
  savannahReducer,
  statisticsReducer,
});
