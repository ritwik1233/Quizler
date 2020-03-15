import React from 'react';
import { Grid } from '@material-ui/core';

import QuestionItem from './QuestionItem.js';

class QuestionList extends React.Component {

  deleteItem = (status) => {
    this.props.deleteItem(status);
  };
  
  editItem = (question) => {
    this.props.editItem(question);
  };


  render() {
    const questionList = this.props.allQuestions.map((eachdata, key) => {
      return (
        <Grid key={key} item xs = {12}>
          <QuestionItem question={eachdata} deleteItem={this.deleteItem} editItem={this.editItem} />
        </Grid>
      )
    });
    return (
      <Grid container spacing={3}>
        {questionList}
      </Grid> 
    );
  };
}

  
export default QuestionList;

