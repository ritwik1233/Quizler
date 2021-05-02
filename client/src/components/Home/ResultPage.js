import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, TableContainer, Table, TableRow, TableBody, TableHead, TableCell } from '@material-ui/core';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Check from '@material-ui/icons/Check';
import Close from '@material-ui/icons/Close';

function ResultPage(props) {   

    const totalAnswered = (quizResult) => {
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

    const correctAnswers = (quizResult) => {
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

    const incorrectAnswers = (quizResult) => {
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

    const pointsEarned = (quizResult) => {
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

    const totalPoints = (questions) => {
        const result = questions.reduce((acc, item)=>{ return acc + item.point }, 0);
        return result;
    };

    const getStatus = (options) => {
        for(let i = 0; i < options.length; i++) {
            if(options[i].answeredOption === options[i]._id && options[i].correct) {
                return <Check style={{ color: 'green' }} />;
            }
        }
        return <Close style={{ color: 'red' }} />;
    };

    const getYourAnswer = (options) => {
        for(let i = 0; i < options.length; i++) {
            if(options[i].answeredOption) {
                return options[i].description;
            }
        }
        return;
    };

    const getCorrectAnswer = (options) => {
        for(let i = 0; i < options.length; i++) {
            if(options[i].correct) {
                return options[i].description;
            }
        }
        return;
    };

    if (!props.quizResult.length) {
        return(<Redirect to ="/" />);
    }

    const result = props.quizResult.map((eachQuestion, key) => {
        return(
            <TableRow key={key}>
                <TableCell colSpan={3}>{eachQuestion.question}</TableCell>
                <TableCell colSpan={2}>{getYourAnswer(eachQuestion.options)}</TableCell>
                <TableCell colSpan={2}>{getCorrectAnswer(eachQuestion.options)}</TableCell>
                <TableCell colSpan={1}>{getStatus(eachQuestion.options)}</TableCell>
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
                        Total Question: {props.quizResult.length}
                    </Grid>
                    <Grid item xs={12}>
                        Total Answered: {totalAnswered(props.quizResult)}
                    </Grid>
                    <Grid item xs={12}>
                        Correct Answers: {correctAnswers(props.quizResult)}
                    </Grid>
                    <Grid item xs={12}>
                        Incorrect Answers: {incorrectAnswers(props.quizResult)}
                    </Grid>
                    <Grid item xs={12}>
                        Points Earned: {pointsEarned(props.quizResult)} out of {totalPoints(props.quizResult)}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={6}>
                {!props.currentUser._id ?<Typography variant="body1">
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

function mapStateToProps(state) {
    return {
        quizResult: state.home.quizResult,
        currentUser: state.auth.currentUser,
    }
};

// type checking for props
ResultPage.propTypes = {
    quizResult: PropTypes.arrayOf(Object),
    currentUser: PropTypes.objectOf(Object),
};
  
// setting default props
ResultPage.defaultProps = {
    quizResult: [],
    currentUser: [],
};

export default connect(mapStateToProps)(ResultPage);