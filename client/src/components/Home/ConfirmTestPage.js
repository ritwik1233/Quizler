import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid, Button, Card, CardContent } from '@material-ui/core';
import { connect, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { editHomeQuiz, getAllHomeQuiz } from '../../actions/index.js';

function ConfirmTestPage(props) {
  const dispatch = useDispatch();
  const [redirect, setRedirect] = React.useState(false);
  //Component Did Mount Start
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const _id = urlParams.get('q');
    if (_id !== null) {
      if (props.allQuiz.length > 0) {
        const item = props.allQuiz.find((each) => {
          return each._id === _id;
        });
        if (!item) {
          setRedirect(true);
          return;
        }
        dispatch(editHomeQuiz(item));
        return;
      }
      dispatch(getAllHomeQuiz());
      return;
    }
    setRedirect(true);
  }, []);
  //Component Did Mount End

  //Component Did Update Start
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const _id = urlParams.get('q');
    if (_id !== null) {
      if (props.allQuiz.length > 0) {
        const item = props.allQuiz.find((each) => {
          return each._id === _id;
        });
        if (!item) {
          setRedirect(true);
          return;
        }
        dispatch(editHomeQuiz(item));
        return;
      }
      return;
    }
    setRedirect(true);
  }, [props.allQuiz]);
  //Component Did Update Stop

  const handleSubmit = () => {
    props.history.push('/newtest');
  };

  const handleCancel = () => {
    dispatch(editHomeQuiz({}));
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        &nbsp;
      </Grid>
      <Grid item xs={12}>
        &nbsp;
      </Grid>
      {props.editQuiz._id && (
        <React.Fragment>
          <Grid item xs={1}></Grid>
          <Grid item xs={10}>
            <Card>
              <CardContent>
                <Grid container spacing={0}>
                  <Grid item xs={12}>
                    <Typography variant="h5">
                      &nbsp;Name: {props.editQuiz.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      &nbsp;Description: {props.editQuiz.description}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      &nbsp;Time: {props.editQuiz.time} minutes
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      &nbsp;Number of Questions:{' '}
                      {props.editQuiz.questions.length}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      &nbsp;Total Point:{' '}
                      {props.editQuiz.questions.reduce(
                        (acc, item) => acc + item.point,
                        0
                      )}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      &nbsp;You are about to start the quiz. Click cancel to to
                      back or Start to start the test
                    </Typography>
                  </Grid>
                  <Grid item xs={10}></Grid>
                  <Grid item xs={1}>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item xs={1}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit}
                    >
                      Start
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={1}>
            &nbsp;
          </Grid>
        </React.Fragment>
      )}
    </Grid>
  );
}

function mapStateToProps(state) {
  return {
    editQuiz: state.home.editQuiz,
    allQuiz: state.home.allQuiz,
  };
}

// type checking for props
ConfirmTestPage.propTypes = {
  editQuiz: PropTypes.objectOf(Object),
  allQuiz: PropTypes.arrayOf(Object),
};

// setting default props
ConfirmTestPage.defaultProps = {
  editQuiz: {},
  allQuiz: [],
};
export default connect(mapStateToProps)(ConfirmTestPage);
