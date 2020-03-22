import React from 'react';
import { Typography, Grid, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

import { editHomeQuiz } from '../../actions/index.js';

class ConfirmTestPage extends React.Component {

    handleCancel = () => {
        this.props.editHomeQuiz({});
    };

    handleSubmit = () => {
      this.props.history.push('/newtest');
    };

    render() {
        if(!this.props.editQuiz._id) {
            return(<Redirect to="/"/>);
        }
        return (
            <Grid container spacing={0}>
                   <Grid item xs={12}>&nbsp;</Grid>
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
                  <Typography variant="body1">&nbsp;Total Point: {this.props.editQuiz.questions.reduce((acc, item)=>{ return acc + item.point }, 0)}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">&nbsp;You are about to start the quiz. Click cancel to to back or Start to start the test</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" onClick={this.handleCancel}>Cancel</Button>
                    &nbsp;
                    <Button variant="contained" onClick={this.handleSubmit}>Start</Button>
                </Grid>
            </Grid>
        );
    }
}

function mapStateToProps(state) {
    return {
        editQuiz: state.home.editQuiz
    }
};

function mapDispatchToProps (dispatch) {
    return bindActionCreators({
      editHomeQuiz
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmTestPage);