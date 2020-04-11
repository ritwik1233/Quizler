import React from 'react';
import { Grid } from '@material-ui/core';

import QuizItem from './QuizItem';

function QuizListComponent(props) {

  const deleteItem = (status) => {
    props.deleteItem(status);
  };
  
  const editItem = (quiz) => {
    props.editItem(quiz);
  };

  const quizList = props.allQuiz.map((eachdata) => {
    return (
      <Grid key={eachdata._id} item xs={12}>
        <QuizItem quiz={eachdata} deleteItem={deleteItem} editItem={editItem} />
      </Grid>
    )
  });
  return (
    <Grid container spacing={3}>
      {quizList}
    </Grid> 
  );
};

  
export default QuizListComponent;
