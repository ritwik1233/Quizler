const authReducer = function (state = { currentUser: {} }, action) {
  switch (action.type) {
    case 'GET_USER':
      return { ...state, currentUser: { ...action.payload } };
    case 'GET_USER_FAILED':
      return { ...state, currentUser: {} };
    default:
      return state;
  }
};
export default authReducer;
