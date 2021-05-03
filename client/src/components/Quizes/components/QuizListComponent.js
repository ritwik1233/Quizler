import React from 'react';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import QuizItem from './QuizItem';

function QuizListComponent(props) {

  const deleteItem = (status) => {
    props.deleteItem(status);
  };
  
  const editItem = (quiz) => {
    props.editItem(quiz);
  };

  const shareLink = (link) => {
    props.shareLink(link);
  }
  
  const handleOpen = () =>{
    props.handleOpen();
  }

  const quizList = props.allQuiz.map((eachdata) => {
    return (
      <Grid key={eachdata._id} item xs={12}>
        <QuizItem 
        quiz={eachdata}
        deleteItem={deleteItem}
        editItem={editItem}
        handleOpen={handleOpen}
        shareLink={shareLink} />
      </Grid>
    )
  });
  return (
    <Grid container spacing={3}>
      {quizList}
    </Grid> 
  );
};

// type checking for props
QuizListComponent.propTypes = {
  allQuiz: PropTypes.arrayOf(Object),
  deleteItem: PropTypes.func,
  editItem: PropTypes.func,
  shareLink: PropTypes.func,
  handleOpen: PropTypes.func
};

// setting default props
QuizListComponent.defaultProps = {
  allQuiz: [],
  deleteItem: ()=>{},
  editItem: ()=>{},
  shareLink: ()=>{},
  handleOpen: ()=>{}
};

export default QuizListComponent;
