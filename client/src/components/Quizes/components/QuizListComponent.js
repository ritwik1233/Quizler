import React from 'react';
import { Grid } from '@material-ui/core';

import QuizItem from './QuizItem';

class QuizListComponent extends React.Component {

  deleteItem = (status) => {
    this.props.deleteItem(status);
  };
  
  editItem = (quiz) => {
    this.props.editItem(quiz);
  };


  render() {
    const quizList = this.props.allQuiz.map((eachdata, key) => {
      return (
        <Grid key={eachdata._id} item xs={12}>
          <QuizItem quiz={eachdata} deleteItem={this.deleteItem} editItem={this.editItem} />
        </Grid>
      )
    });
    return (
      <Grid container spacing={3}>
        {quizList}
      </Grid> 
    );
  };
}

  
export default QuizListComponent;
