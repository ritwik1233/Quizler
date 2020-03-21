import React from 'react';
import { Grid, Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, IconButton } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from 'axios';
import Delete  from '@material-ui/icons/Delete';
import Edit  from '@material-ui/icons/Edit';

class QuizItem extends React.Component {

  deleteItem = () => {
    const payload = {
      _id: this.props.quiz._id
    }
    axios.delete('/api/deleteQuiz', { params: payload }).then(result=>{
      this.props.deleteItem(true);
    }).catch(err=>{
      this.props.deleteItem(false);  
    });
  };

  editItem = () => { 
    this.props.editItem(this.props.quiz);
  };

  render() {
    return (
      <Grid container spacing={0}>
        <Grid item xs={10}>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header">
              <Typography>{this.props.quiz.name}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                     <Typography>Description: {this.props.quiz.description}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                     <Typography>Time: {this.props.quiz.time}min</Typography>
                    </Grid>
                    {this.props.quiz.questions.map((eachQuestion) => {
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
          <IconButton component="span" onClick={this.editItem}>
            <Edit />
          </IconButton>
        </Grid>
        <Grid item xs={1}>
          <IconButton component="span" onClick={this.deleteItem}>
            <Delete />
          </IconButton>
        </Grid>
      </Grid>
    );
  }
}

  
export default QuizItem;