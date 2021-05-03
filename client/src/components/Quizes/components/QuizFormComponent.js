import React from 'react';
import {  Typography, TextField, Button, Grid,
  Accordion, AccordionSummary, AccordionDetails, IconButton
} from '@material-ui/core';
import PropTypes from 'prop-types';
import axios from 'axios';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';

function QuizFormComponent(props) {
  const [name, setName] = React.useState('');
  const [questions, setQuestions] = React.useState([]);
  const [description, setDescription] = React.useState('');
  const [time, setTime] = React.useState(0);

  React.useEffect(() => {
    setName(props.editQuiz.name);
    setQuestions(props.editQuiz.questions);
    setDescription(props.editQuiz.description);
    setTime(props.editQuiz.time);
  }, [props.editQuiz])

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };
    
  const submitQuiz = (e) => {
    e.preventDefault();
    if(!questions.length) {
      return;
    }
    const updatedQuestions = questions.map((eachdata) => {
      return {
        question: eachdata.question,
        options: eachdata.options,
        point: eachdata.point
      }
    });
    const data = {
      _id: props.editQuiz._id ? props.editQuiz._id : undefined ,
      name: name,
      time: time,
      description: description,
      questions: updatedQuestions
    };
    axios.post('/api/addQuiz', data).then((res)=>{
      props.handleRedirect();
    });
  };
 
  const addQuestion = () => {
   props.addQuestion();
  };

  const  handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const deleteQuestion = (data) => {
    const allQuestion = questions.filter(eachData=>eachData._id !== data._id);
    setQuestions(allQuestion);
    props.deleteQuestion(allQuestion);
  };
  return (
        <form onSubmit={submitQuiz}>
          <Typography variant="h6">Quiz</Typography>
          <TextField
            variant="outlined"
            margin="normal"
            id="name"
            label="Enter Name of Quiz"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={handleNameChange}
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
            value={description}
            onChange={handleDescriptionChange}
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
            value={time}
            onChange={handleTimeChange}
            required
            fullWidth
          />
          <br/>
          <br/>
          {questions.length > 0 && <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="body1">Questions</Typography>
              <hr/>
            </Grid>
            {questions.map((question, key) => {
              return (
                <React.Fragment key={key}>
                  <Grid item xs={11}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header">
                            <Typography>{question.question}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
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
                        </AccordionDetails>
                    </Accordion>
                    <br/>
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton aria-label="delete" size="medium" onClick={() => { deleteQuestion(question) }}>
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
            onClick={addQuestion}
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


// type checking for props
QuizFormComponent.propTypes = {
  editQuiz: PropTypes.objectOf(Object),
  selectedQuestions: PropTypes.arrayOf(Object),
  allQuestions: PropTypes.arrayOf(Object),
  handleRedirect: PropTypes.func,
  addQuestion: PropTypes.func,
  deleteQuestion: PropTypes.func
};

// setting default props
QuizFormComponent.defaultProps = {
  editQuiz: {},
  selectedQuestions: [],
  allQuestions: [],
  handleRedirect: ()=>{},
  addQuestion: ()=>{},
  deleteQuestion: ()=>{}
};

export default QuizFormComponent;