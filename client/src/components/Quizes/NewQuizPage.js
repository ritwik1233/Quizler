import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchUser, getAllQuestion } from '../../actions/index.js';
import QuizFormComponent from './components/QuizFormComponent.js';



class NewQuizPage extends React.Component {
  state = {
    redirect: ''
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
  };

  handleRedirect = () => {
    this.props.history.push('/quiz');
  };

  render() {
    if(this.state.redirect.length > 0) {
      return (<Redirect to={this.state.redirect} />);
    }
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>&nbsp;</Grid>
        <Grid item xs={12}>
          <Paper>
            <Grid container spacing={0}>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                    <QuizFormComponent
                      editQuiz={this.props.editQuiz}
                      allQuestions={this.props.allQuestions}
                      handleRedirect={this.handleRedirect}/>
                </Grid>
                <Grid item xs={2}></Grid>
            </Grid>
            <Grid item xs={12}>&nbsp;</Grid>
          </Paper>
        </Grid>
      </Grid> 
    );
  }
}
function mapStateToProps(state) {
  return {
    currentUser: state.auth.currentUser,
    allQuestions: state.questions.allQuestions,
    editQuiz: state.quiz.editQuiz
   }
  }
function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    fetchUser, getAllQuestion
  }, dispatch)
};
  
export default connect(mapStateToProps, mapDispatchToProps)(NewQuizPage);

