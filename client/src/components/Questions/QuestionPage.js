import React from 'react';
import {
  Grid,
  Modal,
  Typography,
  Link,
  Button,
  DialogContent,
} from '@material-ui/core';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';

import {
  getAllQuestion,
  fetchUser,
  editQuestion,
} from '../../actions/index.js';
import QuestionList from './components/QuestionList.js';
import SearchComponent from '../Common/SearchComponent.js';
import FileUploadComponent from '../Common/FileUploadComponent.js';

function QuestionPage(props) {
  const [redirect, setRedirect] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const dispatch = useDispatch();

  // Component Did Mount Hook
  React.useState(() => {
    dispatch(fetchUser());
    dispatch(getAllQuestion());
  }, []);

  // componentDidUpdate Hook for current User Object
  React.useEffect(() => {
    const _id = props.currentUser._id;
    if (_id !== 'default' && !_id) {
      setRedirect(true);
    }
  }, [props.currentUser]);

  const deleteItem = (status) => {
    if (status) {
      dispatch(getAllQuestion());
    }
  };

  const editItem = (question) => {
    dispatch(editQuestion(question));
    props.history.push('/newquestions');
  };

  const handleAdd = () => {
    dispatch(editQuestion({}));
  };

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const fileUpload = () => {
    setModalOpen(false);
    dispatch(props.getAllQuestion());
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}></Grid>
      <Grid item xs={12}></Grid>
      <Grid item xs={12}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            &nbsp;
          </Grid>
          <Grid item xs={12}>
            <Modal
              open={modalOpen}
              onClose={handleClose}
              style={{
                width: '90%',
                marginTop: '10%',
                marginLeft: '5%',
              }}
            >
              <DialogContent>
                <FileUploadComponent fileUpload={fileUpload} />
              </DialogContent>
            </Modal>
          </Grid>
          <Grid item xs={9}>
            <Typography variant="h5">&nbsp;&nbsp;Questions</Typography>
          </Grid>
          <Grid item xs={2}>
            {props.currentUser.verified && (
              <Button onClick={handleOpen} variant="contained">
                Upload Question
              </Button>
            )}
          </Grid>
          <Grid item xs={1}>
            <Link to="/newquestions" component={RouterLink}>
              <Button
                onClick={handleAdd}
                variant="contained"
                endIcon={<AddIcon />}
              >
                Add
              </Button>
            </Link>
          </Grid>
          <Grid item xs={12}>
            &nbsp;
          </Grid>
          <Grid item xs={12}>
            <SearchComponent type="question" />
          </Grid>
          <Grid item xs={12}>
            <QuestionList
              allQuestions={props.allQuestions}
              deleteItem={deleteItem}
              editItem={editItem}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

function mapStateToProps(state) {
  return {
    allQuestions: state.questions.allQuestions,
    currentUser: state.auth.currentUser,
  };
}

// type checking for props
QuestionPage.propTypes = {
  allQuestions: PropTypes.arrayOf(Object),
  currentUser: PropTypes.objectOf(Object),
};

// setting default props
QuestionPage.defaultProps = {
  currentUser: { _id: 'default' },
  allQuiz: [],
};
export default connect(mapStateToProps)(QuestionPage);
