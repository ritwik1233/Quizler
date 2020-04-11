import React from 'react';
import { Grid, Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, IconButton } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from 'axios';
import Delete  from '@material-ui/icons/Delete';
import Edit  from '@material-ui/icons/Edit';

function QuestionItem(props) {

  const deleteItem = () => {
    const payload = {
      _id: props.question._id
    }
    axios.delete('/api/deleteQuestion', { params: payload }).then(result=>{
      props.deleteItem(true);
    }).catch(err=>{
      props.deleteItem(false);  
    });
  }

  const editItem = () => { 
    props.editItem(props.question);
  }

  return (
    <Grid container spacing={0}>
      <Grid item xs={10}>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header">
            <Typography>{props.question.question}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
              <Grid container spacing={3}>
                  {props.question.options.map((eachdata, key) => {
                      return (
                          <React.Fragment key={key}>
                              <Grid item xs={6}>
                                  <Typography variant="body1">{eachdata.description}</Typography>
                              </Grid>
                              <Grid item xs={2}>
                                  <Typography variant="body1">{ eachdata.correct?'Correct': 'Incorrect' }</Typography>
                              </Grid>
                          </React.Fragment>
                      );
                  })}
              </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
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

export default QuestionItem;