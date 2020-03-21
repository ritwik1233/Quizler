import {combineReducers} from 'redux';
import authReducers from './authReducers.js';
import questionReducer from './questionReducers.js';
import quizReducer from './quizReducers.js';
import homeReducer from './homeReducer.js';

const CombineReducers = combineReducers({
    auth: authReducers,
    questions: questionReducer,
    quiz: quizReducer,
    home: homeReducer
});

export default CombineReducers;
