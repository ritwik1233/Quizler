import axios from 'axios';

export function fetchUser() {
  return function(dispatch){
    axios.get('/api/currentUser')
      .then(res => {
         dispatch({
           type: 'GET_USER',
           payload: res.data
         });
      }).catch(err => {
        dispatch({
          type: 'GET_USER_FAILED'
        });
      });
    }
};

export function getAllQuestion() {
  return function(dispatch){
    axios.get('/api/getAllQuestions')
      .then(res => {
         dispatch({
           type: 'GET_ALL_QUESTIONS',
           payload: res.data
         });
      }).catch(err => {
        dispatch({
          type: 'GET_ALL_QUESTIONS_FAILED'
        });
      });
    }
};
export function editQuestion(editQuestions) {
  return function(dispatch){
    dispatch({
      type: 'EDIT_QUESTION',
      payload: editQuestions
    });
  }
};
