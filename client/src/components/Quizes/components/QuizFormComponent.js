import React from 'react';
import { Typography, TextField, Button, Modal } from '@material-ui/core';

import AddQuestionComponent from './AddQuestionComponent.js';

// name: String,
// time: Number,
// questions: [{
//   question: String,
//   options: [{
//     description: String,
//     correct: Boolean
//   }],
//   point: Number
// }],
// like: Number,
// dislike: Number,
// comments: [{
//   message: String,
//   date: Date,
//   createdBy: String
// }],
// createdBy: String,
// createdDate: String




class QuizFormComponent extends React.Component {
  state = {
    name: '',
    time: 0,
    modalStatus: false
  }

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  };

  handleTimeChange = (e) => {
    this.setState({ time: e.target.value });
  };

  handleModalOpen = () => {
      this.setState({ modalStatus: true })
  };

  handleModalClose = () => {
    this.setState({ modalStatus: false })
  };

  submitQuiz = (e) => {
    e.preventDefault();
    console.log('Here');
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

            <Button
            variant="contained"
            color="primary"
            onClick={this.handleModalOpen}
            >
            Add Question
            </Button>
            <br/>
            <br/>
            <Modal
            open={this.state.modalStatus}
            onClose={this.handleModalClose}
            style={{
              marginTop: '100px',
              marginLeft: `${parseInt(window.innerWidth/4)}px`,
              width: '800px'
            }}
            BackdropProps={{
              tabIndex: -1
            }}
            >
            <AddQuestionComponent allQuestions={this.props.allQuestions} />
            </Modal>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              >
              Submit
            </Button>
          </form>
            
    );
  }
};

export default QuizFormComponent;
