import React from 'react';
import { Grid, Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, IconButton } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from 'axios';
import Delete  from '@material-ui/icons/Delete';
import Edit  from '@material-ui/icons/Edit';
import Share from '@material-ui/icons/Share';

function QuizItem(props) {

  const deleteItem = () => {
    const payload = {
      _id: props.quiz._id
    }
    axios.delete('/api/deleteQuiz', { params: payload }).then(result => {
      props.deleteItem(true);
    }).catch(err=>{
      props.deleteItem(false);  
    });
  };

  const editItem = () => { 
    props.editItem(props.quiz);
  };

  const shareLink = () => {
    props.shareLink(props.quiz._id);
    props.handleOpen();
  };

  return (
    <Grid container spacing={0}>
      <Grid item xs={9}>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header">
            <Typography>{props.quiz.name}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
              <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography>Description: {props.quiz.description}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>Time: {props.quiz.time}min</Typography>
                  </Grid>
                  {props.quiz.questions.map((eachQuestion) => {
                      return (
                          <Grid item xs={12} key={eachQuestion._id}>                                
                          <ExpansionPanel>
                              <ExpansionPanelSummary
                                  expandIcon={<ExpandMoreIcon />}
                                  aria-controls="panel1a-content"
                                  id="panel1a-header">
                                    <Typography>{eachQuestion.question}</Typography>
                              </ExpansionPanelSummary>
                              <ExpansionPanelDetails>
                              <Grid container spacing={3}>
                                  {eachQuestion.options.map((eachOption) => {
                                      return (
                                          <React.Fragment key={eachOption._id}>
                                              <Grid item xs={6}>
                                                  <Typography variant="body1">{eachOption.description}</Typography>
                                              </Grid>
                                              <Grid item xs={2}>
                                                  <Typography variant="body1">{ eachOption.correct?'Correct': 'Incorrect' }</Typography>
                                              </Grid>
                                          </React.Fragment>
                                      );
                                  })}
                              </Grid>
                              </ExpansionPanelDetails>
                          </ExpansionPanel>    
                          </Grid>
                      );
                  })}
              </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Grid>
      <Grid item xs={1}>
        <IconButton component="span" onClick={shareLink}>
          <Share />
        </IconButton>
      </Grid>
      <Grid item xs={1}>
        <IconButton component="span" onClick={editItem}>
          <Edit />
        </IconButton>
      </Grid>
      <Grid item xs={1}>
        <IconButton component="span" onClick={deleteItem}>
          <Delete />
        </IconButton>
      </Grid>
    </Grid>
  );
}

  
export default QuizItem;