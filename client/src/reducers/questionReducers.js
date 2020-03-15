const questionReducer = function(state = { allQuestions: [], editQuestion: {} }, action) {
    switch (action.type) {
      case 'GET_ALL_QUESTIONS':
        return { ...state, allQuestions: [ ...action.payload] };
      case 'GET_ALL_QUESTIONS_FAILED':
        return { ...state, allQuestions: [] };
      case 'EDIT_QUESTION':
         return {...state, editQuestion: {...action.payload } };
      default:
       return state;
    }
  }
export default questionReducer;