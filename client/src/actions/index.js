import axios from "axios";

export function fetchUser() {
  return function (dispatch) {
    axios
      .get("/api/currentUser")
      .then((res) => {
        dispatch({
          type: "GET_USER",
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: "GET_USER_FAILED",
        });
      });
  };
}

export function getAllQuestion(query) {
  return function (dispatch) {
    axios
      .get("/api/getAllQuestions", { params: { ...query } })
      .then((res) => {
        dispatch({
          type: "GET_ALL_QUESTIONS",
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: "GET_ALL_QUESTIONS_FAILED",
        });
      });
  };
}

export function editQuestion(editQuestions) {
  return function (dispatch) {
    dispatch({
      type: "EDIT_QUESTION",
      payload: editQuestions,
    });
  };
}

export function editQuiz(editQuiz) {
  return function (dispatch) {
    dispatch({
      type: "EDIT_QUIZ",
      payload: editQuiz,
    });
  };
}

export function showResult(result) {
  return function (dispatch) {
    dispatch({
      type: "QUIZ_RESULT",
      payload: result,
    });
  };
}

export function editHomeQuiz(editQuiz) {
  return function (dispatch) {
    dispatch({
      type: "EDIT_HOME_QUIZ",
      payload: editQuiz,
    });
  };
}

export function getAllQuiz(query) {
  return function (dispatch) {
    axios
      .get("/api/getAllQuiz", { params: { ...query } })
      .then((res) => {
        dispatch({
          type: "GET_ALL_QUIZ",
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: "GET_ALL_QUIZ_FAILED",
        });
      });
  };
}

export function getAllHomeQuiz(query) {
  return function (dispatch) {
    axios
      .get("/api/getAllHomeQuiz", { params: { ...query } })
      .then((res) => {
        dispatch({
          type: "GET_ALL_HOME_QUIZ",
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: "GET_ALL_HOME_QUIZ_FAILED",
        });
      });
  };
}
