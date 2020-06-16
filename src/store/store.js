import { createStore, combineReducers } from 'redux';
import {  } from './reducers'

const configureStore = () => {
    return createStore (
        combineReducers( {
        })
    )
};

export  { configureStore }