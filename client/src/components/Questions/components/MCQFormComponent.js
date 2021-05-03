import React from 'react';
import { Typography, TextField, Button, MenuItem } from '@material-ui/core';
import axios from 'axios';
import PropTypes from 'prop-types';

import AddOptionFormComponent from './AddOptionFormComponent.js';
import OptionListComponent from './OptionListComponent.js';

function MCQFormComponent(props) {
  const [addOption, setAddOption] = React.useState(false);
  const [question, setQuestion] = React.useState('');
  const [point, setPoint] = React.useState(0);
  const [options, setOptions] = React.useState([]);
  const [tag, setTag] = React.useState([]);
  const [tagValue, setTagValue] = React.useState('');

  React.useEffect(() => {
    if(props.editQuestion.question) {
    setQuestion(props.editQuestion.question);
    }
  }, [props.editQuestion.question]);

  React.useEffect(() => {
    if(props.editQuestion.point) {
      setPoint(props.editQuestion.point);
    }
  }, [props.editQuestion.point]);

  React.useEffect(() => {
    if(props.editQuestion.options) {
      setOptions(props.editQuestion.options);
    }
  }, [props.editQuestion.options]);

  React.useEffect(() => {
    if(props.editQuestion.tag) {
      setTagValue(props.editQuestion.tag);
    }
  }, [props.editQuestion.tag])

  const handleOption = () => {
    setAddOption(true);
  };

  const handleCancel = () => {
    setAddOption(false);
  };

  const addOptionForm = (optionData) => {
    const optionArray = options;
    optionArray.push(optionData);
    setOptions(optionArray);
    setAddOption(false);
  };

  const deleteOption = (optionIndex) => {
    let optionArray = options.filter((eachData, index) =>(index !== optionIndex));
    setOptions(optionArray);
  };

  const submitQuestion = (e) => {
    e.preventDefault();
    const data = {
      _id: props.editQuestion._id ? props.editQuestion._id : undefined,
      question: question,
      options: options,
      tag: tagValue,
      point: point,
      type: 'MCQ'
    };
    axios.post('/api/addQuestion', data)
      .then(() => {
        props.handleRedirect();
      })
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  }

  const handlePointChange = (e) => {
    setPoint(e.target.value);
  }

  const selectOption = (tagValue) => {
    setTagValue(tagValue);
  };

  const handleTagChange = (e) => {
    setTagValue(e.target.value);
    axios.get('/api/getAllTag', {
      params: {
        tag: e.target.value
      }
    })
    .then(res => {
      setTag(res.data);
    }).catch(err => {
      setTag([]);
    });
  };

  const option = options.map((eachData, index) => {
    return (
      <OptionListComponent
        optionData={eachData}
        key={index}
        index={index}
        deleteOption={deleteOption}
      />
    )
  });

  return (
    <form onSubmit={submitQuestion}>
      <TextField
        variant="outlined"
        margin="normal"
        id="question"
        label="Question"
        name="question"
        autoComplete="question"
        autoFocus
        value={question}
        onChange={handleQuestionChange}
        required
        fullWidth
      />
      <Button 
        variant="contained"
        color="primary"
        onClick={handleOption}>
          Add Option
      </Button>
      {addOption &&
        <React.Fragment>
        <br/>
        <br/>
        <AddOptionFormComponent
        addOptionForm={addOptionForm}
        handleCancel={handleCancel}
      />
      </React.Fragment>}
      <br/>
      {options.length>0 && 
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
        value={point}
        onChange={handlePointChange}
        required
        fullWidth
      />
      {tag.length > 0 ? 
      <TextField
        style ={{ marginBottom: '0px' }}
        variant="outlined"
        margin="normal"
        onChange={handleTagChange}
        value={tagValue}
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
      onChange={handleTagChange}
      value={tagValue}
      required
      fullWidth
      id ="tag"
      label="Tag"
      name="tag"
      autoComplete="tag"
      />}
      {tag.length > 0 &&
        <div style={{
          borderStyle: 'solid',
          borderWidth: '1px'
        }}>
        {tag.map((eachData, key) => {
            return (
            <MenuItem 
            onClick={() => {selectOption(eachData)} } 
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

// type checking for props
MCQFormComponent.propTypes = {
  editQuestion: PropTypes.objectOf(Object),
  handleRedirect: PropTypes.func

};

// setting default props
MCQFormComponent.defaultProps = {
  editQuestion: {},
  handleRedirect: ()=>{}
};
export default MCQFormComponent;

