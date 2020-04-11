import React from 'react';
import { Typography, Grid, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { editHomeQuiz, getAllHomeQuiz } from '../../actions/index.js';

class ConfirmTestPage extends React.Component {
  
    state = {
      redirect: false,
      allQuiz: false
    } 

    handleCancel = () => {
      this.props.editHomeQuiz({});
    };

    handleSubmit = () => {
      this.props.history.push('/newtest');
    };

    componentDidMount() {
      const urlParams = new URLSearchParams(window.location.search);
      const _id = urlParams.get('q');
      if (_id !== null) {
        if(this.props.allQuiz.length > 0) {
          const item = this.props.allQuiz.find(each => {
            return each._id === _id
          });
          if(!item) {
            this.setState({ redirect: true });
            return;
          }
          this.props.editHomeQuiz(item);
        } else {
          this.props.getAllHomeQuiz();
          this.setState({ allQuiz: true });
        }
      } else {
        this.setState({ redirect: true })
      }
    };
    
    componentDidUpdate(prevProps, prevState) {
      if(this.props.allQuiz.length > 0) {
        if(this.state.allQuiz) {
          const urlParams = new URLSearchParams(window.location.search);
          const _id = urlParams.get('q');
          const item = this.props.allQuiz.find(each => {
            return each._id === _id
          });
          if(!item) {
            this.setState({ redirect: true, allQuiz: false });
            return;
          }
          this.props.editHomeQuiz(item);
          this.setState({ allQuiz: false });
        }
      }
      if((prevProps.editQuiz !== this.props.editQuiz) && !this.props.editQuiz._id) {
        this.setState({ redirect: true });
      }
    };


    render () {
        if(this.state.redirect) {
          return(<Redirect to="/" />);
        }
        return (
          <Grid container spacing={0}>
              <Grid item xs={12}>&nbsp;</Grid>
            {this.props.editQuiz._id && <React.Fragment>
             <Grid item xs={12}>
                <Typography variant="h5">&nbsp;Name: {this.props.editQuiz.name}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">&nbsp;Description: {this.props.editQuiz.description}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">&nbsp;Time: {this.props.editQuiz.time}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">&nbsp;Number of Questions: {this.props.editQuiz.questions.length}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">&nbsp;Total Point: {this.props.editQuiz.questions.reduce((acc, item)=>(acc + item.point ), 0)}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">&nbsp;You are about to start the quiz. Click cancel to to back or Start to start the test</Typography>
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" onClick={this.handleCancel}>Cancel</Button>
                &nbsp;
                <Button variant="contained" onClick={this.handleSubmit}>Start</Button>
            </Grid> 
            </React.Fragment>}
           
        </Grid>
      );
    }
}

function mapStateToProps(state) {
    return {
      editQuiz: state.home.editQuiz,
      allQuiz: state.home.allQuiz
    }
};

function mapDispatchToProps (dispatch) {
    return bindActionCreators({
      editHomeQuiz,
      getAllHomeQuiz
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmTestPage);