import React from 'react';
import { Grid, Typography, Select, MenuItem } from '@material-ui/core';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import MCQFormComponent from './components/MCQFormComponent.js';
import BlankFormComponent from './components/BlankFormComponent.js';
import { fetchUser } from '../../actions/index.js';

function NewQuestionPage(props) {
  const dispatch = useDispatch();
  const [redirect, setRedirect] = React.useState(false);
  const [questionType, setQuestionType] = React.useState('MCQ');

  // Component Did Mount Hook
  React.useState(() => {
    dispatch(fetchUser());
  }, []);

  // componentDidUpdate Hook for current User Object
  React.useEffect(() => {
    const _id = props.currentUser._id;
    if (_id !== 'default' && !_id) {
      setRedirect(true);
    }
  }, [props.currentUser]);

  React.useEffect(() => {
    setQuestionType(props.editQuestion.type);
  }, [props.editQuestion]);

  const handleQuestionType = (e) => {
    setQuestionType(e.target.value);
  };

  const handleRedirect = () => {
    props.history.push('/questions');
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        &nbsp;
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            &nbsp;
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
            <Typography variant="h6">New Question</Typography>
            <Select
              variant="outlined"
              name="type"
              value={questionType}
              onChange={handleQuestionType}
              fullWidth
              required
            >
              <MenuItem value="MCQ">MCQ</MenuItem>
              <MenuItem value="MCQBLANK">Fill In Blank(MCQ)</MenuItem>
            </Select>
            {questionType === 'MCQ' ? (
              <MCQFormComponent
                handleRedirect={handleRedirect}
                editQuestion={props.editQuestion}
              />
            ) : (
              <BlankFormComponent
                handleRedirect={handleRedirect}
                editQuestion={props.editQuestion}
              />
            )}
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={12}>
            &nbsp;
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

function mapStateToProps(state) {
  return {
    currentUser: state.auth.currentUser,
    editQuestion: state.questions.editQuestion,
  };
}

// type checking for props
NewQuestionPage.propTypes = {
  editQuestion: PropTypes.objectOf(Object),
  currentUser: PropTypes.objectOf(Object),
};

// setting default props
NewQuestionPage.defaultProps = {
  currentUser: { _id: 'default' },
  editQuestion: {},
};
export default connect(mapStateToProps)(NewQuestionPage);
