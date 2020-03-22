import React from 'react';
import { Typography, Grid, Paper, Button, FormControl, FormLabel, RadioGroup, FormControlLabel  } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

import { showResult } from '../../actions/index.js';

class NewTestPage extends React.Component {

    constructor(props) {
        super(props);
        this.timer = 0;
        this.state = {
            next: 0,
            minute: this.props.editQuiz.time - 1,
            seconds: 60,
            minuteInterval: true,
            answers: [],
            answerValue: '',
            redirect: ''
        };
    }

    componentDidMount() {
        this.timer = setInterval(this.countDown, 1000);
    };

    componentWillUnmount() {
        clearInterval(this.timer);
    };

    componentDidUpdate(prevPros, prevState) {
        if(this.state.minuteInterval) {
            if(this.state.seconds === 0 && this.state.minute === 0){
                this.setState({ minuteInterval: false });
                clearInterval(this.timer);
                this.submitAnswer();
            } else {
                this.setState({ minuteInterval: false });
            }
        }
        if(prevState.next!==this.state.next) {
            const checkAnswer = this.state.answers[this.state.next];
            if (checkAnswer !== undefined) {
                this.setState({ answerValue: checkAnswer });
            }
        }
    };

    countDown = () => {
        const seconds = this.state.seconds - 1;
        let minute = this.state.minute;
        if (seconds === 0) {
            if (minute === 0) {
                this.setState({ minute: 0, seconds: 0, minuteInterval: true });
                return;
            }
            minute = minute - 1;
            this.setState({ minute, seconds: 60, minuteInterval: true });
            return;
        }
        this.setState({ seconds: seconds });
    };

    prevQuestion = () => {
        const prev = this.state.next - 1;
        if (this.state.answerValue) {         
            let answerArray = this.state.answers;
            answerArray[this.state.next] = this.state.answerValue;
            this.setState({ answers: answerArray, next: prev, answerValue: '' });
            return;
        }
        this.setState({ next: prev });
    };

    handleOptionChange = (e) => {
        if((this.state.next + 1) === this.props.editQuiz.questions.length) {
            let answerArray = this.state.answers;
            answerArray[this.state.next] = e.target.value;
            this.setState({ answerValue: e.target.value, answers: answerArray });
            return;
        }
        this.setState({ answerValue: e.target.value });
    };

    nextQuestion = () => {
        const next = this.state.next + 1;
        if (this.state.answerValue) {         
            let answerArray = this.state.answers;
            answerArray[this.state.next] = this.state.answerValue;
            this.setState({ answers: answerArray, next, answerValue: '' });
            return;
        }
        this.setState({ next });
    };

    submitAnswer = () => {
        const allQuestions = this.props.editQuiz.questions;
        const allAnswers = this.state.answers;
        let result = [];
        for (let i = 0; i < allQuestions.length; i += 1) {
            if(!allAnswers[i]) {
                result[i] = {
                    ...this.props.editQuiz.questions[i],
                };
            } else {
             let options = this.props.editQuiz.questions[i].options;
             let optionIndex = options.findIndex((eachOption) => {
                return eachOption.description === allAnswers[i]
             });
             options = options.map((eachOption, key) => {
                    if(optionIndex === key) {
                        if (eachOption.correct) {
                            return {
                                ...eachOption, answeredOption: true
                            };
                        }
                        return {
                            ...eachOption, answeredOption: false
                        };
                    }
                    return {
                        ...eachOption
                    };
                });
             result[i] = {
                ...this.props.editQuiz.questions[i],
                options
              };
            }
        }
        this.props.showResult(result);
        this.setState({ redirect: '/result' });
    };

    render() {
        if (this.state.redirect.length) {
           return (<Redirect to={this.state.redirect} />); 
        }

        if (!this.props.editQuiz._id) {
            return(<Redirect to="/"/>);
        }

        const questions = this.props.editQuiz.questions[this.state.next];
        const options = <FormControl component="fieldset">
                <FormLabel component="legend">Options</FormLabel>
                <RadioGroup  value={this.state.answerValue} onChange={this.handleOptionChange}>
                {this.props.editQuiz.questions[this.state.next].options.map((eachdata, key) => {
                    return (
                  <FormControlLabel key={key} value={eachdata.description} control={<Radio />} label={eachdata.description} />
                    )
                })
                }
                </RadioGroup>
              </FormControl>;
        const questionCard = <React.Fragment>
            <Grid item xs={2}></Grid>
            <Grid item xs={8}>
                <Paper>
                    <Grid container spacing={0}>
                        <Grid item xs={12}>
                            <Typography variant="body1">{questions.question}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <hr/>
                        </Grid>
                        <Grid item xs={12}>
                            {options}
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={10}></Grid>
            <Grid item xs={1}>
                {this.state.next !== 0
                && <Button variant="contained" onClick={this.prevQuestion}>Prev</Button>}
            </Grid>
            <Grid item xs={1}>
                {(this.state.next + 1) !== this.props.editQuiz.questions.length
                ?
                <Button variant="contained" onClick={this.nextQuestion}>Next</Button>:
                <Button variant="contained" onClick={this.submitAnswer}>Submit</Button>
                }
            </Grid>
        </React.Fragment>

        const timer = this.state.minuteInterval ?
        `Timer:${this.state.minute < 10 ? '0' : ''}${(this.state.minute+1)}:00 `:
        `Timer:${this.state.minute < 10 ? '0' : ''}${this.state.minute}:${this.state.seconds < 10 ? '0' : ''}${this.state.seconds}`;      

        return (
            <Grid container spacing={0}>
               <Grid item xs={12}>&nbsp;</Grid>
               <Grid item xs={10}></Grid>
                <Grid item xs={2}>
                    <Typography variant="body1">
                        {timer}                
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6">Question: {(this.state.next + 1)} of {this.props.editQuiz.questions.length}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1">Total Answered: {this.state.answers.length} of {this.props.editQuiz.questions.length}</Typography>
                </Grid>        
                {questionCard}
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
        showResult
    }, dispatch)
};



export default connect(mapStateToProps, mapDispatchToProps)(NewTestPage);