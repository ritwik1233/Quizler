import React from 'react';
import { Typography, TextField, Button, MenuItem } from '@material-ui/core';
import axios from 'axios';


import AddOptionFormComponent from './AddOptionFormComponent.js';
import OptionListComponent from './OptionListComponent.js';


class MCQFormComponent extends React.Component {
  state = {
    addOption: false,
    question: this.props.editQuestion.question ? this.props.editQuestion.question : '',
    point: this.props.editQuestion.point ? this.props.editQuestion.point : 0,
    options: this.props.editQuestion.options? this.props.editQuestion.options : [],
    tag: [],
    tagValue: this.props.editQuestion.tag ? this.props.editQuestion.tag : ''
  };
  
  handleOption = () => {
    this.setState({
      addOption: true
    });
  };

  handleCancel = () => {
    this.setState({ addOption: false })
  };

  addOptionForm = (optionData) => {
    const optionArray = this.state.options;
    optionArray.push(optionData);
    this.setState({ options: optionArray, addOption: false });
  };

  deleteOption = (optionIndex) => {
    let optionArray = this.state.options.filter((eachData, index) =>(index !== optionIndex));
    this.setState({ options: optionArray });
  };

  submitQuestion = (e) => {
    e.preventDefault();
    const data = {
      _id: this.props.editQuestion._id ? this.props.editQuestion._id : undefined,
      question: this.state.question,
      options: this.state.options,
      tag: this.state.tagValue,
      point: this.state.point,
      type: 'MCQ'
    };
    axios.post('/api/addQuestion', data)
      .then(() => {
        this.props.handleRedirect();
      })
  };

  handleQuestionChange = (e) => {
    this.setState({ question: e.target.value });
  }

  handlePointChange = (e) => {
    this.setState({ point: e.target.value });  
  }

  handleQuestionType = (e) => {
    this.setState({ questionType: e.target.value});
  };

  selectOption = (tagValue) => {
    this.setState({ tagValue: tagValue });
  };

  handleTagChange = (e) => {
    this.setState({ tagValue: e.target.value });
    axios.get('/api/getAllTag', {
      params: {
        tag: e.target.value
      }
    })
    .then(res => {
      this.setState({ tag: res.data });
    }).catch(err => {
      this.setState({ tag: []});
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if(prevState.tagValue !== this.state.tagValue && this.state.tagValue.length > 0 && this.state.tagValue.length > 0) {
      this.setState({ tag: [] });
    }
  };

  render() {
    const option = this.state.options.map((eachData, index) => {
      return (
        <OptionListComponent
          optionData={eachData}
          key={index}
          index={index}
          deleteOption={this.deleteOption}
        />
      )
    });
    return (
          <form onSubmit={this.submitQuestion}>
            <TextField
              variant="outlined"
              margin="normal"
              id="question"
              label="Question"
              name="question"
              autoComplete="question"
              autoFocus
              value={this.state.question}
              onChange={this.handleQuestionChange}
              required
              fullWidth
            />
            <Button 
              variant="contained"
              color="primary"
              onClick={this.handleOption}>
                Add Option
            </Button>
            {this.state.addOption &&
              <React.Fragment>
              <br/>
              <br/>
              <AddOptionFormComponent
              addOptionForm={this.addOptionForm}
              handleCancel={this.handleCancel}
            />
            </React.Fragment>}
            <br/>
            {this.state.options.length>0 && 
            <Typography variant="h6">Options</Typography>}
            {option}    
            <TextField
              variant="outlined"
              margin="normal" 
              name="point"
              label="Point"
              type="number"
              id="point"
              autoComplete="point"
              value={this.state.point}
              onChange={this.handlePointChange}
              required
              fullWidth
            />
            {this.state.tag.length > 0 ? 
            <TextField
              style ={{ marginBottom: '0px' }}
              variant="outlined"
              margin="normal"
              onChange={this.handleTagChange}
              value={this.state.tagValue}
              required
              fullWidth
              id ="tag"
              label="Tag"
              name="tag"
              autoComplete="tag"
            />
            :
            <TextField
            variant="outlined"
            margin="normal"
            onChange={this.handleTagChange}
            value={this.state.tagValue}
            required
            fullWidth
            id ="tag"
            label="Tag"
            name="tag"
            autoComplete="tag"
            />}
            {this.state.tag.length > 0 &&
              <div style={{
                borderStyle: 'solid',
                borderWidth: '1px'
              }}>
              {this.state.tag.map((eachData, key) => {
                  return (
                  <MenuItem 
                  onClick={() => {this.selectOption(eachData)} } 
                  key={key}>
                    {eachData}
                  </MenuItem>
                  )
                })}
              </div>
            }
            <br/>               
            <Button
              type ='submit'
              fullWidth
              variant = 'contained'
              color = 'primary'>
              Submit
            </Button>
            </form>
            
    );
  }
};

export default MCQFormComponent;
