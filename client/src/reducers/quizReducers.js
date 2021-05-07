const quizReducer = function (state = { allQuiz: [], editQuiz: {} }, action) {
  switch (action.type) {
    case 'GET_ALL_QUIZ':
      return { ...state, allQuiz: [...action.payload] };
    case 'GET_ALL_QUIZ_FAILED':
      return { ...state, allQuiz: [] };
    case 'EDIT_QUIZ':
      return { ...state, editQuiz: { ...action.payload } };
    default:
      return state;
  }
};
export default quizReducer;
