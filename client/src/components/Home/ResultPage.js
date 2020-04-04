import React from 'react';
import { Grid, Typography, TableContainer, Table, TableRow, TableBody, TableHead, TableCell } from '@material-ui/core';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class ResultPage extends React.Component {
    
    totalAnswered = (quizResult) => {
       const result = quizResult.reduce((acc, eachItem) => {
            const option = eachItem.options.find((eachOption) => {
                return eachOption.answeredOption !== undefined
            });
            if(option !== undefined) {
                return acc + 1;
            }
            return acc + 0;
            }, 0);
        return result;
    };

    correctAnswers = (quizResult) => {
        const result = quizResult.reduce((acc, eachItem) => {
            const option = eachItem.options.find((eachOption) => {
            return eachOption.answeredOption !== undefined
        });
        if(option !== undefined) {
            if(option.correct) {
                return acc + 1;
            }
        }
            return acc + 0;
        }, 0);
        return result;
    };

    incorrectAnswers = (quizResult) => {
        const result = quizResult.reduce((acc, eachItem) => {
            const option = eachItem.options.find((eachOption) => {
                return eachOption.answeredOption !== undefined
            });
            if(option !== undefined) {
                if(option.correct === false) {
                    return acc + 1;
                }
            }
            return acc + 0;
        }, 0);
        return result;

    };

    pointsEarned = (quizResult) => {
        const result = quizResult.reduce((acc, eachItem) => {
            const option = eachItem.options.find((eachOption) => {
                return eachOption.answeredOption !== undefined
            });
            if(option !== undefined) {
                if(option.correct) {
                    return acc + eachItem.point;
                }
            }
            return acc + 0;
        }, 0);
        return result;
    };

    totalPoints = (questions) => {
        const result = questions.reduce((acc, item)=>{ return acc + item.point }, 0);
        return result;
    };

    getStatus = (options) => {
        for(let i = 0; i < options.length; i++) {
            if(options[i].answeredOption === options[i]._id && options[i].correct) {
                return 'Correct';
            }
        }
        return 'Incorrect';
    };

    getYourAnswer = (options) => {
        for(let i = 0; i < options.length; i++) {
            if(options[i].answeredOption) {
                return options[i].description;
            }
        }
        return;
    };

    getCorrectAnswer = (options) => {
        for(let i = 0; i < options.length; i++) {
            if(options[i].correct) {
                return options[i].description;
            }
        }
        return;
    };

    render() {
        if (!this.props.quizResult.length) {
            return(<Redirect to ="/" />);
        }
        const result = this.props.quizResult.map((eachQuestion, key) => {
            return(
            <TableRow key={key}>
                <TableCell colSpan={3}>{eachQuestion.question}</TableCell>
                <TableCell colSpan={2}>{this.getYourAnswer(eachQuestion.options)}</TableCell>
                <TableCell colSpan={2}>{this.getCorrectAnswer(eachQuestion.options)}</TableCell>
                <TableCell colSpan={1}>{this.getStatus(eachQuestion.options)}</TableCell>
            </TableRow>
            );
        });
        return (
            <Grid container spacing={0}>
                <Grid item xs={12}>&nbsp;</Grid>
                <Grid item xs={12}>
                    <Typography variant="h6">Result</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Grid container spacing={0}>
                        <Grid item xs={12}>
                            Total Question: {this.props.quizResult.length}
                        </Grid>
                        <Grid item xs={12}>
                            Total Answered: {this.totalAnswered(this.props.quizResult)}
                        </Grid>
                        <Grid item xs={12}>
                            Correct Answers: {this.correctAnswers(this.props.quizResult)}
                        </Grid>
                        <Grid item xs={12}>
                            Incorrect Answers: {this.incorrectAnswers(this.props.quizResult)}
                        </Grid>
                        <Grid item xs={12}>
                            Points Earned: {this.pointsEarned(this.props.quizResult)} out of {this.totalPoints(this.props.editQuiz.questions)}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    {!this.props.currentUser._id ?<Typography variant="body1">
                        Congratulations! You have completed the quiz. Register for more features like creating quizes and so on. 
                    </Typography>: undefined}
                </Grid>
                <Grid item xs={12}>&nbsp;</Grid>
                <Grid item xs={12}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={3}>Questions</TableCell>
                                    <TableCell colSpan={2}>Your Answer</TableCell>
                                    <TableCell colSpan={2}>Correct Answer</TableCell>
                                    <TableCell colSpan={1}>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {result}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        )
    }
}

function mapStateToProps(state) {
    return {
        quizResult: state.home.quizResult,
        editQuiz: state.home.editQuiz,
        currentUser: state.auth.currentUser,
    }
};


export default connect(mapStateToProps)(ResultPage);