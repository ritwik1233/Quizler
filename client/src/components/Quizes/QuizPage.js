import React from 'react';
import { Grid, Typography, Link, Button, Modal, CardContent, Card } from '@material-ui/core';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AddIcon from '@material-ui/icons/Add';


import { fetchUser, getAllQuestion, getAllQuiz, editQuiz } from '../../actions/index.js';
import QuizListComponent from './components/QuizListComponent.js';
import SearchComponent from '../Common/SearchComponent.js';

class QuizPage extends React.Component {
  state = {
    redirect: '',
    modalOpen: false,
    link: ''
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

  handleClose = () => {
    this.setState({ modalOpen: false });
  }
  handleOpen = () => {
    this.setState({ modalOpen: true });
  }

  shareLink = (id) => {
    const link = `${window.location.origin}/confirmtest?q=${id}`;
    console.log(window.location.origin);
    this.setState({ link })
  }

  render() {
    if(this.state.redirect.length > 0) {
      return (<Redirect to={this.state.redirect} />);
    }

    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Modal
              open={this.state.modalOpen}
              onClose={this.handleClose}
                style={{
                  width: '50%',
                  marginTop: '15%',
                  marginLeft: '25%'
                }}
                >
                <Card>
                  <CardContent>
                    <Grid container spacing={0}>
                      <Grid item xs={12}>
                        <Typography variant="h6">Share Link</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <hr/>
                      </Grid>
                      <Grid item xs={12}>
                        <a href={this.state.link} target="_blank" rel="noopener noreferrer">{this.state.link}</a>
                      </Grid>
                      <Grid item xs={12}>
                        &nbsp;
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
            </Modal>
        </Grid>
        <Grid item xs={12}>
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
                <SearchComponent type="quiz" />
              </Grid>
              <Grid item xs={12}>
                  &nbsp;
              </Grid>
              <Grid item xs={12}>
                <QuizListComponent
                allQuiz={this.props.allQuiz} 
                deleteItem={this.deleteItem}
                editItem={this.editItem}
                shareLink={this.shareLink}
                handleOpen={this.handleOpen}
                />
              </Grid>
            </Grid>
        </Grid>
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

