import React from 'react';
import { Typography, Grid, TextField, Button, Select, MenuItem, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, IconButton } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from 'axios';
import Delete  from '@material-ui/icons/Delete';

class QuizFormComponent extends React.Component {
  state = {
    name: this.props.editQuiz.name ? this.props.editQuiz.name : '',
    selectedQuestion: 'None',
    questions: this.props.editQuiz.questions ? this.props.editQuiz.questions: [],
    description: this.props.editQuiz.description ? this.props.editQuiz.description: '' ,
    time: this.props.editQuiz.time ? this.props.editQuiz.time: 0,
  };

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  };

  handleTimeChange = (e) => {
    this.setState({ time: e.target.value });
  };

  handleQuestionChange = (e) => {
    this.setState({ selectedQuestion: e.target.value });
  };

  handleDescriptionChange = (e) => {
    this.setState({ description: e.target.value });
  };

  deleteQuestion = (data) => {
    const allQuestion = this.state.questions.filter(eachData=>eachData._id !== data._id);
    this.setState({ questions: allQuestion });
  };
  
  submitQuiz = (e) => {
    e.preventDefault();
    if(!this.state.questions.length) {
      return;
    }
    const questions= this.state.questions.map((eachdata) => {
      return {
        question: eachdata.question,
        options: eachdata.options,
        point: eachdata.point
      }
    });
    const data = {
      _id: this.props.editQuiz._id ? this.props.editQuiz._id : undefined ,
      name: this.state.name,
      time: this.state.time,
      description: this.state.description,
      questions: questions
    };
    axios.post('/api/addQuiz', data).then((res)=>{
      this.props.handleRedirect();
    });
  };
 
  addQuestion = () => {
    const allQuestion = this.state.questions;
    const checkQuestion = allQuestion.find(element => element._id === this.state.selectedQuestion)
    if(checkQuestion) {
      return;
    }
    const questionData = this.props.allQuestions.find(element => element._id === this.state.selectedQuestion)
    allQuestion.push(questionData);
    this.setState({ questions: allQuestion });
  };

  render() {
    return (
          <form onSubmit={this.submitQuiz}>
           <Typography variant="h6">New Quiz</Typography>
            <TextField
              variant="outlined"
              margin="normal"
              id="name"
              label="Enter Name of Quiz"
              name="name"
              autoComplete="name"
              autoFocus
              value={this.state.name}
              onChange={this.handleNameChange}
              required
              fullWidth
            />
            <TextField
              variant="outlined"
              margin="normal"
              id="description"
              label="Enter Description(Optional)...."
              name="description"
              autoComplete="description"
              value={this.state.description}
              onChange={this.handleDescriptionChange}
              fullWidth
              multiline
              rows="4"
            />
            <TextField
              variant="outlined"
              margin="normal"
              id="time"
              type="number"
              label="Enter Time of Quiz"
              name="time"
              autoComplete="time"
              value={this.state.time}
              onChange={this.handleTimeChange}
              required
              fullWidth
            />
            <Select
            variant="outlined"
            onChange={this.handleQuestionChange}
            value={this.state.selectedQuestion}
            required
            fullWidth
            >
            <MenuItem value="None">
              <em>None</em>
            </MenuItem>
            {this.props.allQuestions.map((eachValue, key) => {
              return (
                <MenuItem key={key} value={eachValue._id}><em>{eachValue.question}</em></MenuItem>
              );
            })}
          </Select>
           {this.state.selectedQuestion!=='None'&&
           <React.Fragment>
            <br/>
           <br/>
           <Button
            variant="contained"
            color="primary"
            onClick={this.addQuestion}>
           Add Question
         </Button>
           </React.Fragment>
          }
          <br/>
          <br/>
          {this.state.questions.map((eachdata,key) => {
            return (
              <Grid container spacing={0} key={key}>
                <Grid item xs={11}>
                  <ExpansionPanel key={key}>
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header">
                      <Typography>{eachdata.question}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid container spacing={3}>
                            <Grid item xs={12}><Typography variant="h6">Options</Typography></Grid>
                            {eachdata.options.map((eachOption, key) => {
                                return (
                                    <React.Fragment key={key}>
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
                <Grid item xs={1}>
                <IconButton component="span" onClick={() =>{this.deleteQuestion(eachdata)}}>
                  <Delete />
                </IconButton>      
                </Grid>
                <Grid item xs={12}>&nbsp;</Grid>
              </Grid>
            )
          })}
           <br/>
           <br/>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth>
              Submit
            </Button>
          </form>
            
    );
  }
};

export default QuizFormComponent;
