import React from "react";
import { Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import QuestionItem from "./QuestionItem.js";

function QuestionList(props) {
  const deleteItem = (status) => {
    props.deleteItem(status);
  };

  const editItem = (question) => {
    props.editItem(question);
  };

  const questionList = props.allQuestions.map((eachdata, key) => {
    return (
      <Grid key={key} item xs={12}>
        <QuestionItem
          question={eachdata}
          deleteItem={deleteItem}
          editItem={editItem}
        />
      </Grid>
    );
  });
  return (
    <Grid container spacing={3}>
      {questionList}
    </Grid>
  );
}

// type checking for props
QuestionList.propTypes = {
  allQuestions: PropTypes.arrayOf(Object),
  deleteItem: PropTypes.func,
  editItem: PropTypes.func,
};

// setting default props
QuestionList.defaultProps = {
  allQuestions: [],
  deleteItem: () => {},
  editItem: () => {},
};

export default QuestionList;
