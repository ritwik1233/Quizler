const homeReducer = function(state = { allQuiz: []}, action) {
    switch (action.type) {
      case 'GET_ALL_HOME_QUIZ':
        return { ...state, allQuiz: [ ...action.payload] };
      default:
        return { ...state }
    }
  }
export default homeReducer;