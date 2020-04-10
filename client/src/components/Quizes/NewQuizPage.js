import React from 'react';
import { Grid, Modal } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchUser, getAllQuestion } from '../../actions/index.js';
import QuizFormComponent from './components/QuizFormComponent.js';
import QuizModalComponent from './components/QuizModalComponent.js';


class NewQuizPage extends React.Component {
  state = {
    redirect: '',
    modalOpen: false,
    selectedQuestions: []
  };

  componentDidMount () {
    this.props.fetchUser();
    this.props.getAllQuestion();
  };

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.currentUser._id && !this.props.currentUser._id && this.state.redirect.length === 0) {
      this.setState({ redirect: '/' });
    }
    if(prevProps.currentUser._id && !this.props.currentUser._id) {
      this.setState({ redirect: '/' });
    }
    if(this.props.currentUser._id && !this.props.currentUser.verified) {
      this.props.history.goBack();  
    }
  };

  handleRedirect = () => {
    this.props.history.push('/quiz');
  };

  addQuestion = () => {
    this.setState({ modalOpen: true });
  };

  handleClose = () => {
    this.setState({ modalOpen: false });
  };

  addQuestionData = (data) => {
    const selectedQuestions = data.map(eachdata=>{
      const key = Object.keys(eachdata)[0];
      const questionData = this.props.allQuestions.find(question => {
        return question._id === key; 
      })
      return questionData;
    });
    this.setState({ selectedQuestions, modalOpen: false });
  };

  deleteQuestion = (selectedQuestions) => {
    this.setState({ selectedQuestions });;
  }


  render() {
    if(this.state.redirect.length > 0) {
      return (<Redirect to={this.state.redirect} />);
    }
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>&nbsp;</Grid>
        <Grid item xs={12}>
            <Modal
              open={this.state.modalOpen}
              onClose={this.handleClose}
                style={{
                    width: '90%',
                    marginLeft: '5%',
                    maxHeight: 'auto',
                    overflowY: 'auto'
                }}>
                <QuizModalComponent
                addQuestionData={this.addQuestionData}
                selectedQuestions={this.state.selectedQuestions}
                getAllQuestion={this.props.getAllQuestion}
                />
            </Modal>
        </Grid>
        <Grid item xs={12}>
            <Grid container spacing={0}>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                    <QuizFormComponent
                      editQuiz={this.props.editQuiz}
                      allQuestions={this.props.allQuestions}
                      handleRedirect={this.handleRedirect}
                      addQuestion={this.addQuestion}
                      deleteQuestion={this.deleteQuestion}
                      selectedQuestions={this.state.selectedQuestions}
                      />
                </Grid>
                <Grid item xs={2}></Grid>
            </Grid>
            <Grid item xs={12}>&nbsp;</Grid>
        </Grid>
      </Grid> 
    );
  }
};

function mapStateToProps(state) {
  return {
    currentUser: state.auth.currentUser,
    allQuestions: state.questions.allQuestions,
    editQuiz: state.quiz.editQuiz
   }
};

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    fetchUser, getAllQuestion
  }, dispatch)
};
  
export default connect(mapStateToProps, mapDispatchToProps)(NewQuizPage);

