import React from 'react';
import { Grid, Paper, Typography, Link, Button } from '@material-ui/core';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AddIcon from '@material-ui/icons/Add';

import { getAllQuestion, fetchUser, editQuestion } from '../../actions/index.js';
import QuestionList from './components/QuestionList.js';

class QuestionPage extends React.Component {
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

  deleteItem = (status) => {
    if (status) {
      this.props.getAllQuestion();
    }
  };

  editItem = (question) => {
    this.props.editQuestion(question)
    this.props.history.push('/newquestions');
  }
  handleAdd = () => {
    this.props.editQuestion({});
  }

  render() {
    if(this.state.redirect.length > 0) {
      return (<Redirect to={this.state.redirect} />);
    }
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        { window.innerWidth > 800 && <Grid item xs={2}></Grid> }
        <Grid item xs={ window.innerWidth < 800 ? 12: 8 }>
          <Paper>
            <Grid container spacing = {0}>
              <Grid item xs={12}>&nbsp;</Grid>
              <Grid item xs={10}>
                <Typography variant="h5">&nbsp;&nbsp;Questions</Typography>
              </Grid>
              <Grid item xs={2}>
                 <Link to="/newquestions" component={RouterLink}>
                    <Button
                     onClick={this.handleAdd}
                     variant="contained"
                     endIcon={<AddIcon/>}>
                      Add 
                    </Button>
                 </Link>
              </Grid>
              <Grid item xs={12}>&nbsp;</Grid>
              <Grid item xs={12}>
                <QuestionList allQuestions={this.props.allQuestions} deleteItem={this.deleteItem} editItem={this.editItem} />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        { window.innerWidth > 800 && <Grid item xs={2}></Grid> }
      </Grid> 
    );
  }
}
function mapStateToProps(state) {
  return {
    allQuestions: state.questions.allQuestions,
    currentUser: state.auth.currentUser
   }
  }
function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    getAllQuestion, fetchUser, editQuestion
  }, dispatch)
};
  
export default connect(mapStateToProps, mapDispatchToProps)(QuestionPage);
