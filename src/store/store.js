import { createStore } from 'redux';
import app  from './reducers'

const configureStore = () => {
    return createStore(app)
};

export  { configureStore }