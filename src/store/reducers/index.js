import appStateReducer from './appStateReducer';
import wordsReducer from './wordsReducer';
import { savannahReducer} from "./savannahReducer";
import { combineReducers } from 'redux'

export default combineReducers({ appStateReducer, wordsReducer, savannahReducer })
