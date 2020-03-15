import React from 'react';
import { TextField, Button, MenuItem, ButtonGroup, Tooltip, Typography } from '@material-ui/core';
import axios from 'axios';

import AddOptionFormComponent from './AddOptionFormComponent.js';
import OptionListComponent from './OptionListComponent.js';


class BlankFormComponent extends React.Component {
  
  state = {
    tag: [],
    options: this.props.editQuestion.options ? this.props.editQuestion.options : [],
    tagValue: this.props.editQuestion.tag ? this.props.editQuestion.tag : '',
    point: this.props.editQuestion.point ? this.props.editQuestion.point: 0,
    sentenceValue: this.props.editQuestion.question ? this.formSetence(this.props.editQuestion) : '',
    sentence: false,
    addOption: false
  };

  formSetence(editQuestion) {
    const correctAnswer = editQuestion.options.find(element => element.correct);
    const firstHalf = editQuestion.question.split('_____')[0].trim().length ? editQuestion.question.split('_____')[0].trim() + ' ' : '';
    const secondHalf = editQuestion.question.split('_____')[1].trim();
    const fullSentence =  firstHalf + correctAnswer.description + ' ' + secondHalf;
    return fullSentence;
  };

  submitQuestion = (e) => { 
    e.preventDefault();
    const data = {
      _id: this.props.editQuestion._id ? this.props.editQuestion._id : undefined,
      question: this.state.sentenceValue,
      options: this.state.options,
      tag: this.state.tagValue,
      point: e.target.point.value,
      type: 'MCQBLANK'
    };
    axios.post('/api/addQuestion', data)
      .then(() => {
        this.props.handleRedirect();
      })   
  };


  wordSplit = (sentence) => {
    return sentence.split(' ');
  };

  markBlank = (data) => {
    const sentence = this.state.sentenceValue.replace(data, '_____');
    const optionArray = this.state.options;
    optionArray.push({ description: data, correct: true });
    this.setState({ options: optionArray, sentenceValue: sentence });
  };

  handleOption = () => {
    this.setState({
        addOption: true
    });
  };

  handleCancel = () => {
      this.setState({
          addOption: false
      });
  };

  handleSentenceChange = (e) => {
    this.setState({ sentenceValue: e.target.value });
  };

  handlePointChange = (e) => {
    this.setState({ point: e.target.value });
  };
  
  addOptionForm = (optionData) => {
    const optionArray = this.state.options;
    optionArray.push(optionData);
    this.setState({ options: optionArray, addOption: false });
  };

  selectOption = (tagValue) => {
    this.setState({ tagValue: tagValue });
  };

  onSentenceUpdate = () => {
    if (this.state.sentenceValue.length > 0) {
        this.setState({ sentence: !this.state.sentence, options: [] });
    }
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
    const words = this.wordSplit(this.state.sentenceValue);
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
         {!this.state.sentence ?
         <Tooltip title="Enter full sentence">
         <TextField
           variant="outlined"
           margin="normal"
           id="question"
           value={this.state.sentenceValue}
           onChange={this.handleSentenceChange}
           label="Sentence"
           name="question"
           autoComplete="question"
           required
           fullWidth
           autoFocus
         />
         </Tooltip>:
         this.state.options.length > 0 ? 
         <Typography variant="body1">{this.state.sentenceValue}</Typography>:
         <ButtonGroup color="primary" aria-label="outlined primary button group">
            {words.map((eachData, key) => {
                return (
                    <Tooltip title="Mark as blank" key={key}>
                        <Button onClick={()=>{ this.markBlank(eachData)}} >{eachData}</Button>
                    </Tooltip>
                );
            })}
          </ButtonGroup>}
          <Button variant="contained" onClick={this.onSentenceUpdate} color="primary">
            {this.state.sentence?'Remove Sentence':'Add Sentence'}
          </Button>
          <br/>
          {this.state.options.length > 0 &&
            <Button 
            variant="contained"
            color="primary"
            onClick={this.handleOption}>
                Add Option
            </Button>
           }
           {this.state.addOption &&
              <React.Fragment>
                <br/>
                <br/>
                <AddOptionFormComponent
                correct={true}
                addOptionForm={this.addOptionForm}
                handleCancel={this.handleCancel}
              />
              </React.Fragment>
            }
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
          />:
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
            <Button variant="contained" type="submit" color="primary">
           Submit
         </Button>  
        </form>
      );
  }
}
export default BlankFormComponent;