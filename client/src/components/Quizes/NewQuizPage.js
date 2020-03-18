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

  handleAdd = () => {
    console.log('Here');
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
                    <QuizFormComponent allQuestions={this.props.allQuestions}/>
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
   }
  }
function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    fetchUser, getAllQuestion
  }, dispatch)
};
  
export default connect(mapStateToProps, mapDispatchToProps)(NewQuizPage);

