import React from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import {
  Grid,
  Typography,
  Paper,
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  Button,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import SearchComponent from '../../Common/SearchComponent.js';

function QuizModalComponent(props) {
  const [checkedArray, setCheckedArray] = React.useState([]);
  const [selectedQuestions, setSelectedQuestions] = React.useState([]);

  // Use Effect Hook for checked array update
  React.useEffect(() => {
    const checkedArray = props.allQuestions.map((each, i) => {
      const _id = each._id;
      const obj = {};
      const findIndex = props.selectedQuestions.find((q) => {
        return q._id === each._id;
      });
      if (findIndex) {
        obj[_id] = true;
        return obj;
      } else {
        obj[_id] = false;
        return obj;
      }
    });
    setCheckedArray(checkedArray);
  }, [props.allQuestions]);

  React.useEffect(() => {
    setSelectedQuestions(selectedQuestions);
  }, [selectedQuestions]);

  const handleChange = (_id) => {
    const updatedCheckedArray = checkedArray.map((each) => {
      if (each[_id] !== undefined) {
        const obj = each;
        obj[_id] = !obj[_id];
        return obj;
      }
      return { ...each };
    });
    setCheckedArray(updatedCheckedArray);
  };

  const addQuestionData = () => {
    const updatedCheckedArray = checkedArray.filter((each) => {
      const keys = Object.keys(each);
      return each[keys[0]];
    });
    props.addQuestionData(updatedCheckedArray);
  };

  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <Paper>
          <Container fixed>
            <Grid container spacing={0}>
              <Grid item xs={12}>
                &nbsp;
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h4">Questions</Typography>
              </Grid>
              <Grid item xs={12}>
                <hr />
              </Grid>
              <Grid item xs={12}>
                <SearchComponent type="question" />
              </Grid>
              <Grid item xs={12}>
                &nbsp;
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={0}>
                  {props.allQuestions.map((question, key) => {
                    return (
                      <React.Fragment key={key}>
                        <Grid item xs={1}>
                          {checkedArray.length > 0 && (
                            <Checkbox
                              checked={checkedArray[key][question._id]}
                              onChange={() => {
                                handleChange(question._id);
                              }}
                              inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                          )}
                        </Grid>
                        <Grid item xs={11}>
                          <Accordion>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                            >
                              <Typography>{question.question}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Grid container spacing={3}>
                                {question.options.map((option, key) => {
                                  return (
                                    <React.Fragment key={key}>
                                      <Grid item xs={6}>
                                        <Typography variant="body1">
                                          {option.description}
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={2}>
                                        <Typography variant="body1">
                                          {option.correct
                                            ? 'Correct'
                                            : 'Incorrect'}
                                        </Typography>
                                      </Grid>
                                    </React.Fragment>
                                  );
                                })}
                              </Grid>
                            </AccordionDetails>
                          </Accordion>
                          <br />
                        </Grid>
                      </React.Fragment>
                    );
                  })}
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" fullWidth onClick={addQuestionData}>
                  Add
                </Button>
              </Grid>
              <Grid item xs={12}>
                &nbsp;
              </Grid>
            </Grid>
          </Container>
        </Paper>
      </Grid>
    </Grid>
  );
}

function mapStateToProps(state) {
  return {
    allQuestions: state.questions.allQuestions,
  };
}
// type checking for props
QuizModalComponent.propTypes = {
  allQuestions: Proptypes.arrayOf(Object),
  selectedQuestion: Proptypes.arrayOf(Object),
  addQuestionData: Proptypes.func,
  getAllQuestion: Proptypes.func,
};

// setting default props
QuizModalComponent.defaultProps = {
  allQuestions: [],
  selectedQuestion: [],
  addQuestionData: () => {},
  getAllQuestion: () => {},
};

export default connect(mapStateToProps, null, null, { forwardRef: true })(
  QuizModalComponent
);
