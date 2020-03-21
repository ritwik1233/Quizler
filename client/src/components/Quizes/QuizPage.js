import React from 'react';
import { Grid, Paper, Typography, Link, Button } from '@material-ui/core';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AddIcon from '@material-ui/icons/Add';

import { fetchUser, getAllQuestion, getAllQuiz, editQuiz } from '../../actions/index.js';
import QuizListComponent from './components/QuizListComponent.js';

class QuizPage extends React.Component {
  state = {
    redirect: ''
  };

  componentDidMount () {
    this.props.fetchUser();
    this.props.getAllQuestion();
    this.props.getAllQuiz();
  };

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.currentUser._id && !this.props.currentUser._id && this.state.redirect.length === 0) {
      this.setState({ redirect: '/' });
    }
    if(prevProps.currentUser._id && !this.props.currentUser._id) {
      this.setState({ redirect: '/' });
    }
  };

  editItem = (quiz) => {
    this.props.editQuiz(quiz)
    this.props.history.push('/newquiz');
  };

  deleteItem = (status) => {
    if (status) {
      this.props.getAllQuiz();
    }
  }

  handleAdd = () => {
    this.props.editQuiz({});
  };


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
                <Typography variant="h5">&nbsp;&nbsp;Quizes</Typography>
              </Grid>
              <Grid item xs={2}>
                 <Link to="/newQuiz" component={RouterLink}>
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
                <QuizListComponent
                allQuiz={this.props.allQuiz} 
                deleteItem={this.deleteItem}
                editItem={this.editItem}/>
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
    currentUser: state.auth.currentUser,
    allQuiz: state.quiz.allQuiz
   }
  }
function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    fetchUser, getAllQuestion, getAllQuiz, editQuiz
  }, dispatch)
};
  
export default connect(mapStateToProps, mapDispatchToProps)(QuizPage);

