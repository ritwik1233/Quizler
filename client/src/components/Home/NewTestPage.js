import React from "react";
import PropTypes from "prop-types";
import {
  Typography,
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
} from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import { connect, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import QuestionCard from "./QuestionCard.js";

import { showResult } from "../../actions/index.js";

function getTimer(totalTime, totalSeconds) {
  let minute = totalTime - totalSeconds;
  minute = Math.ceil(minute / 60) - 1;
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let second = 60 - (totalSeconds % 60) - 1;
  if (second < 10) {
    second = `0${second}`;
  }
  return `Timer: ${minute}:${second}`;
}

function NewTestPage(props) {
  const dispatch = useDispatch();
  const [answers, setAnswers] = React.useState([]);
  const [answerValue, setAnswerValue] = React.useState("");
  const [redirect, setRedirect] = React.useState("");
  const [seconds, setSeconds] = React.useState(0);
  const [next, setNext] = React.useState(0);

  React.useEffect(() => {
    let timer = setInterval(() => {
      setSeconds((prevSecond) => prevSecond + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const submitAnswer = () => {
    const allQuestions = props.editQuiz.questions;
    const allAnswers = answers;
    let result = allQuestions.map((question, index) => {
      let options = question.options.map((option) => {
        if (option.description === allAnswers[index]) {
          return {
            ...option,
            answeredOption: option._id,
          };
        }
        return {
          ...option,
        };
      });
      return {
        ...question,
        options,
      };
    });
    dispatch(showResult(result));
    setRedirect("/result");
  };

  // hook to check if time is over
  React.useEffect(() => {
    if (seconds >= props.editQuiz.time * 60) {
      submitAnswer();
    }
  }, [seconds]);

  // hook to initialize selected option answers array
  React.useEffect(() => {
    const answerArray = props.editQuiz.questions.map((e) => {
      return 0;
    });
    setAnswers(answerArray);
  }, [props.editQuiz]);

  // hook to update the selected option after clicking on next or previous
  React.useEffect(() => {
    const checkAnswer = answers[next];
    if (checkAnswer !== undefined) {
      setAnswerValue(checkAnswer);
    }
  }, [next]);

  const prevQuestion = () => {
    if (answerValue) {
      let answerArray = answers;
      answerArray[next] = answerValue;
      setAnswers(answerArray);
      setNext((prev) => prev - 1);
      setAnswerValue("");
      return;
    }
    setNext((prev) => prev - 1);
  };
  const handleOptionChange = (e) => {
    let answerArray = answers;
    answerArray[next] = e.target.value;
    setAnswerValue(e.target.value);
    setAnswers(answerArray);
  };
  const nextQuestion = () => {
    setNext((prevNext) => prevNext + 1);
  };

  if (redirect.length) {
    return <Redirect to={redirect} />;
  }
  if (!props.editQuiz._id) {
    return <Redirect to="/" />;
  }
  const selectedQuestion = props.editQuiz.questions[next];
  const timer = getTimer(props.editQuiz.time * 60, seconds);
  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        &nbsp;
      </Grid>
      <Grid item xs={10}></Grid>
      <Grid item xs={2}>
        <Typography variant="body1">{timer}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">
          Question: {next + 1} of {props.editQuiz.questions.length}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">
          Total Answered: {answers.length} of {props.editQuiz.questions.length}
        </Typography>
      </Grid>
      {selectedQuestion && (
        <QuestionCard
          question={selectedQuestion.question}
          next={next}
          questionLength={props.editQuiz.questions.length}
          options={selectedQuestion.options}
          prevQuestion={() => {
            prevQuestion();
          }}
          nextQuestion={() => {
            nextQuestion();
          }}
          submitAnswer={() => {
            submitAnswer();
          }}
        >
          <FormControl component="fieldset">
            <FormLabel component="legend">Options</FormLabel>
            <RadioGroup value={answerValue} onChange={handleOptionChange}>
              {selectedQuestion &&
                selectedQuestion.options.map((eachdata, key) => {
                  return (
                    <FormControlLabel
                      key={key}
                      value={eachdata.description}
                      control={<Radio />}
                      label={eachdata.description}
                    />
                  );
                })}
            </RadioGroup>
          </FormControl>
          ;
        </QuestionCard>
      )}
    </Grid>
  );
}

function mapStateToProps(state) {
  return {
    editQuiz: state.home.editQuiz,
  };
}

// type checking for props
NewTestPage.propTypes = {
  editQuiz: PropTypes.objectOf(Object),
};

// setting default props
NewTestPage.defaultProps = {
  editQuiz: [],
};

export default connect(mapStateToProps)(NewTestPage);
