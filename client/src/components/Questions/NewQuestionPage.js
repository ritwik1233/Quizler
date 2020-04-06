import React from 'react';
import { Grid, Paper, Typography, Select, MenuItem } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

import MCQFormComponent from './components/MCQFormComponent.js';
import BlankFormComponent from './components/BlankFormComponent.js';

import { fetchUser } from '../../actions/index.js';


class NewQuestionPage extends React.Component {
  state = {
    redirect: '',
    questionType: this.props.editQuestion.type ? this.props.editQuestion.type: 'MCQ',
  };

  handleQuestionType = (e) => {
    this.setState({ questionType: e.target.value});
  };

  handleRedirect = () => {
    this.props.history.push('/questions');
  }

  componentDidMount () {
    this.props.fetchUser();
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

  render() {
    if(this.state.redirect.length > 0) {
      return (
        <Redirect to={this.state.redirect} />
      );
    }

    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>&nbsp;</Grid>
        <Grid item xs={12}>
          <Paper>
              <Grid container spacing={0}>
                <Grid item xs={12}>&nbsp;</Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                <Typography variant="h6">New Question</Typography>
                  <Select
                    variant="outlined"
                    name="type"
                    value={this.state.questionType}
                    onChange={this.handleQuestionType}
                    fullWidth
                    required
                   >
                  <MenuItem value='MCQ'>MCQ</MenuItem>
                  <MenuItem value='MCQBLANK'>Fill In Blank(MCQ)</MenuItem>
                </Select>
                {this.state.questionType === 'MCQ' ?
                <MCQFormComponent 
                  handleRedirect={this.handleRedirect} 
                  editQuestion={this.props.editQuestion} /> 
                  :
                <BlankFormComponent 
                handleRedirect={this.handleRedirect}
                editQuestion={this.props.editQuestion}
                />}
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={12}>&nbsp;</Grid>
              </Grid>
          </Paper> 
        </Grid>
      </Grid> 
    );
  }
};
function mapStateToProps(state) {
  return {
    currentUser: state.auth.currentUser,
    editQuestion: state.questions.editQuestion
  }
};

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    fetchUser
  }, dispatch)
};
  
export default connect(mapStateToProps, mapDispatchToProps)(NewQuestionPage);
