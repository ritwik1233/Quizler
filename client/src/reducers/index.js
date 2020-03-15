import {combineReducers} from 'redux';
import authReducers from './authReducers.js';
import questionReducer from './questionReducers.js';

const CombineReducers = combineReducers({
    auth: authReducers,
    questions: questionReducer
});

export default CombineReducers;
