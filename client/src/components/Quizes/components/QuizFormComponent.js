import React from 'react';
import {  Typography, TextField, Button, Grid,
  ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, IconButton
} from '@material-ui/core';
import axios from 'axios';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';

class QuizFormComponent extends React.Component {
  state = {
    name: this.props.editQuiz.name ? this.props.editQuiz.name : '',
    questions: this.props.editQuiz.questions ? this.props.editQuiz.questions: this.props.selectedQuestions.length > 0 ? this.props.selectedQuestions : [],
    description: this.props.editQuiz.description ? this.props.editQuiz.description: '' ,
    time: this.props.editQuiz.time ? this.props.editQuiz.time: 0,
  };

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  };

  handleTimeChange = (e) => {
    this.setState({ time: e.target.value });
  };

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.selectedQuestions !== this.props.selectedQuestions) {
      this.setState({ questions: this.props.selectedQuestions });
    }
  };

  handleDescriptionChange = (e) => {
    this.setState({ description: e.target.value });
  };

  deleteQuestion = (data) => {
    const allQuestion = this.state.questions.filter(eachData=>eachData._id !== data._id);
    this.setState({ questions: allQuestion });
    this.props.deleteQuestion(allQuestion);
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
   this.props.addQuestion();
  };

  render() {
    return (
          <form onSubmit={this.submitQuiz}>
           <Typography variant="h6">Quiz</Typography>
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
           <br/>
           <br/>
           {this.state.questions.length > 0 && <Grid container spacing={3}>
             <Grid item xs={12}>
               <Typography variant="body1">Questions</Typography>
                <hr/>
             </Grid>
              {this.state.questions.map((question, key) => {
                return (
                  <React.Fragment key={key}>
                    <Grid item xs={11}>
                      <ExpansionPanel>
                          <ExpansionPanelSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header">
                              <Typography>{question.question}</Typography>
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails>
                              <Grid container spacing={3}>
                                  {question.options.map((option, key) => {
                                      return (
                                          <React.Fragment key={key}>
                                              <Grid item xs={6}>
                                                  <Typography variant="body1">{option.description}</Typography>
                                              </Grid>
                                              <Grid item xs={2}>
                                                  <Typography variant="body1">{ option.correct?'Correct': 'Incorrect' }</Typography>
                                              </Grid>
                                          </React.Fragment>
                                      );
                                  })}
                              </Grid>
                          </ExpansionPanelDetails>
                      </ExpansionPanel>
                      <br/>
                    </Grid>
                    <Grid item xs={1}>
                      <IconButton aria-label="delete" size="medium" onClick={() => { this.deleteQuestion(question) }}>
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                    </Grid>
                  </React.Fragment>
                );
                })
              }
           </Grid>
           }
          
           <br/>
           <br/>
           <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={this.addQuestion}
              >
              Add Question
            </Button>
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
