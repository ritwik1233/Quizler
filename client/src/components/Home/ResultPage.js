import React from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';

class ResultPage extends React.Component {
    render() {
        if (!this.props.quizResult.length) {
            return(<Redirect to ="/" />);
        }
        const result = this.props.quizResult.map((eachResult, key)=>{
                    return(
                        <React.Fragment key={key}>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={10}>
                                <Paper>
                                <Grid container spacing={0}>
                                    <Grid item xs={12}>
                                        <Typography variant="body1">&nbsp;{eachResult.question}</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container spacing={0}>
                                        {eachResult.options.map((eachOption, key)=> {
                                            const color = eachOption.answeredOption !== undefined ? '#C8C8C8': '#FFFFFF' ;
                                            return (
                                                 <Grid id="here" item xs={12} key={key} style={{
                                                    background: color
                                                 }}>
                                                    <Grid container spacing={0}>
                                                        <Grid item xs={2}>
                                                            <Typography variant="body1">
                                                                &nbsp;{eachOption.description}
                                                            </Typography>   
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <Typography variant="body1">
                                                                &nbsp;{eachOption.correct?
                                                                <DoneIcon
                                                                style={{fill: "green"}}
                                                                />
                                                                :
                                                                <CloseIcon
                                                                style={{fill: "red"}}
                                                                />}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={7}>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            )
                                        })}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                            </Grid>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={12}>&nbsp;</Grid>
                        </React.Fragment>
                );
                });
            
        return (
            <Grid container spacing={0}>
                <Grid item xs={12}>&nbsp;</Grid>
                <Grid item xs={12}>
                    <Typography variant="h6">Result Page</Typography>
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={12}>
                    Total Question: {this.props.quizResult.length}
                </Grid>
                <Grid item xs={12}>
                    Total Answered: {this.props.quizResult.reduce((acc, eachItem) => {
                        const option = eachItem.options.find((eachOption) => {
                            return eachOption.answeredOption !== undefined
                        });
                        if(option !== undefined) {
                            return acc + 1;
                        }
                        return acc + 0;
                    }, 0)}
                </Grid>
                <Grid item xs={12}>
                    Correct Answers: {this.props.quizResult.reduce((acc, eachItem) => {
                        const option = eachItem.options.find((eachOption) => {
                            return eachOption.answeredOption !== undefined
                        });
                        if(option !== undefined) {
                            if(option.correct) {
                                return acc + 1;
                            }
                        }
                        return acc + 0;
                    }, 0)}
                </Grid>
                <Grid item xs={12}>
                    Incorrect Answers: {this.props.quizResult.reduce((acc, eachItem) => {
                        const option = eachItem.options.find((eachOption) => {
                            return eachOption.answeredOption !== undefined
                        });
                        if(option !== undefined) {
                            if(option.correct === false) {
                                return acc + 1;
                            }
                        }
                        return acc + 0;
                    }, 0)}
                </Grid>
                

                <Grid item xs={12}>
                    Points Earned: {this.props.quizResult.reduce((acc, eachItem) => {
                        const option = eachItem.options.find((eachOption) => {
                            return eachOption.answeredOption !== undefined
                        });
                        if(option !== undefined) {
                            if(option.correct) {
                                return acc + eachItem.point;
                            }
                        }
                        return acc + 0;
                    }, 0)} out of {this.props.editQuiz.questions.reduce((acc, item)=>{ return acc + item.point }, 0)}
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={0}>
                        <Grid item xs={1}>
                            Legends:
                        </Grid>
                        <Grid item xs={1}>
                            Correct Answer:
                        </Grid>
                        <Grid item xs={1}>
                            <DoneIcon style={{ fill: "green" }} fontSize="small"/>
                        </Grid>
                        <Grid item xs={1}>
                            Incorrect Answer:
                        </Grid>
                        <Grid item xs={1}>
                            <CloseIcon style={{ fill: "red" }} fontSize="small"/>
                        </Grid>
                        <Grid item xs={1}>
                            Your Answer:
                        </Grid>
                        <Grid item xs={1}>
                            <Paper style={{width:'10px', background: '#C8C8C8' }}>&nbsp;</Paper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>&nbsp;</Grid>
                {result}
                <Grid item xs={1}></Grid>
            </Grid>
        )
    }
}

function mapStateToProps(state) {
    return {
        quizResult: state.home.quizResult,
        editQuiz: state.home.editQuiz
    }
};


export default connect(mapStateToProps)(ResultPage);