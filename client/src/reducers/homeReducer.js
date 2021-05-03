const homeReducer = function (
  state = { allQuiz: [], editQuiz: {}, quizResult: [] },
  action
) {
  switch (action.type) {
    case "GET_ALL_HOME_QUIZ":
      return { ...state, allQuiz: [...action.payload] };
    case "EDIT_HOME_QUIZ":
      return { ...state, editQuiz: { ...action.payload } };
    case "QUIZ_RESULT":
      return { ...state, quizResult: [...action.payload] };
    default:
      return { ...state };
  }
};
export default homeReducer;
