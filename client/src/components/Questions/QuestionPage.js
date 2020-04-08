import React from 'react';
import { Grid, Modal, Typography, Link, Button } from '@material-ui/core';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AddIcon from '@material-ui/icons/Add';

import { getAllQuestion, fetchUser, editQuestion } from '../../actions/index.js';
import QuestionList from './components/QuestionList.js';
import SearchComponent from '../Common/SearchComponent.js';
import FileUploadComponent from '../Common/FileUploadComponent.js';

class QuestionPage extends React.Component {
  state = {
    redirect: '',
    modalOpen: false
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
  };

  handleAdd = () => {
    this.props.editQuestion({});
  };

  handleOpen = () => {
    this.setState({ modalOpen: true });
  };

  handleClose = () => {
    this.setState({ modalOpen: false });
  };

  fileUpload = () => {
    this.setState({ modalOpen: false });
    this.props.getAllQuestion();
  }

  render() {
    if(this.state.redirect.length > 0) {
      return (<Redirect to={this.state.redirect} />);
    }
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}>
            <Grid container spacing={0}>
              <Grid item xs={12}>&nbsp;</Grid>
              <Grid item xs={12}>
                <Modal
                  open={this.state.modalOpen}
                  onClose={this.handleClose}
                  style={{
                    width: '90%',
                    marginTop: '10%',
                    marginLeft: '5%'
                  }}
                  >
                  <FileUploadComponent fileUpload={this.fileUpload} />
                </Modal>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="h5">&nbsp;&nbsp;Questions</Typography>
              </Grid>
              <Grid item xs={2}>
                <Button
                  onClick={this.handleOpen}
                  variant="contained">
                    Upload Question 
                </Button>
              </Grid>
              <Grid item xs={1}>
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
                <SearchComponent />
              </Grid>
              <Grid item xs={12}>
                <QuestionList 
                  allQuestions={this.props.allQuestions}
                  deleteItem={this.deleteItem}
                  editItem={this.editItem} />
              </Grid>
            </Grid>
        </Grid>
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
