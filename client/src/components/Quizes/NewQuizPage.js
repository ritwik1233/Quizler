import React from 'react';
import { Grid, Modal } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchUser, getAllQuestion } from '../../actions/index.js';
import QuizFormComponent from './components/QuizFormComponent.js';
import QuizModalComponent from './components/QuizModalComponent.js';

function NewQuizPage(props) {
  const dispatch = useDispatch();
  const [redirect, setRedirect] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedQuestions, setSelectedQuestions] = React.useState([]);

  // Component Did Mount Hook
  React.useState(() => {
    dispatch(fetchUser());
    dispatch(getAllQuestion());
  },[]);

  // componentDidUpdate Hook for current User Object
  React.useEffect(() => {
    const _id = props.currentUser._id;
    if(_id !== 'default' && !_id) {
        setRedirect(true);
    }
  }, [props.currentUser]);

  const handleRedirect = () => {
    props.history.push('/quiz');
  };

  const addQuestion = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const addQuestionData = (data) => {
    const selectedQuestions = data.map(eachdata=>{
      const key = Object.keys(eachdata)[0];
      const questionData = props.allQuestions.find(question => {
        return question._id === key; 
      })
      return questionData;
    });
    setSelectedQuestions(selectedQuestions);
    setModalOpen(false);
  };

  const deleteQuestion = (selectedQuestions) => {
    setSelectedQuestions(selectedQuestions);
  }
  
  if(redirect) {
    return (<Redirect to='/' />);
  }
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>&nbsp;</Grid>
      <Grid item xs={12}>
          <Modal
            open={modalOpen}
            onClose={handleClose}
              style={{
                  width: '90%',
                  marginLeft: '5%',
                  maxHeight: 'auto',
                  overflowY: 'auto'
              }}>
              <QuizModalComponent
                selectedQuestions={selectedQuestions}
                addQuestionData={addQuestionData}
                getAllQuestion={getAllQuestion}
              />
          </Modal>
      </Grid>
      <Grid item xs={12}>
          <Grid container spacing={0}>
              <Grid item xs={2}></Grid>
              <Grid item xs={8}>
                  <QuizFormComponent
                    editQuiz={props.editQuiz}
                    selectedQuestions={selectedQuestions}
                    allQuestions={props.allQuestions}
                    handleRedirect={handleRedirect}
                    addQuestion={addQuestion}
                    deleteQuestion={deleteQuestion}
                    />
              </Grid>
              <Grid item xs={2}></Grid>
          </Grid>
          <Grid item xs={12}>&nbsp;</Grid>
      </Grid>
    </Grid> 
  );
}

function mapStateToProps(state) {
  return {
    currentUser: state.auth.currentUser,
    allQuestions: state.questions.allQuestions,
    editQuiz: state.quiz.editQuiz
   }
};

// type checking for props
NewQuizPage.propTypes = {
  currentUser: PropTypes.objectOf(Object),
  allQuestions: PropTypes.arrayOf(Object),
  editQuiz: PropTypes.objectOf(Object)
};

// setting default props
NewQuizPage.defaultProps = {
  currentUser: { _id: 'default' },
  allQuiz: []
};
export default connect(mapStateToProps)(NewQuizPage);
