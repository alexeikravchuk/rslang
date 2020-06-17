import { createStore, compose, applyMiddleware } from 'redux';
import reduxLogger from 'redux-logger';
import reduxThunk from 'redux-thunk';
import app  from './reducers'

const composeEnchancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = (preloadedState = {}) => {
    return createStore(app,
      preloadedState,
      composeEnchancers(applyMiddleware(reduxThunk, reduxLogger)))
};

export  { configureStore }