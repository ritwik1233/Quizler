import React from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchUser, getAllHomeQuiz } from '../../actions/index.js';

class HomePage extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
    this.props.getAllHomeQuiz();
  };

  render() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>&nbsp;</Grid>
        <Grid item xs={12}>
          <Typography variant="h5"> HomePage </Typography> 
        </Grid>
        {this.props.allQuiz.map((eachQuiz, key) => {
          return(
            <React.Fragment key={key}>
              <Grid item xs={1}></Grid>
              <Grid item xs={10}>
              <Paper>
                <Grid item xs={12}>
                <Typography variant="h6">&nbsp;{eachQuiz.name}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <hr/>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">&nbsp;Description: {eachQuiz.description}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">&nbsp;Time: {eachQuiz.time}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">&nbsp;Number of Questions: {eachQuiz.questions.length}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">&nbsp;Created by: {eachQuiz.createdBy}</Typography>
                </Grid>
              </Paper>
              </Grid>
              <Grid item xs={1}></Grid>
            </React.Fragment>
          );
        })}
      </Grid> 
    );
  };
};

function mapStateToProps(state) {
  return {
    allQuiz: state.home.allQuiz
   }
};

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    fetchUser,
    getAllHomeQuiz
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

