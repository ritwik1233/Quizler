import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Card, CardContent, Button, Typography } from '@material-ui/core';

function QuestionCard(props) {
    return (
        <React.Fragment>
        <Grid item xs={1}></Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={8}>
            <Card>
                <CardContent>
                    <Grid container spacing={0}>
                        <Grid item xs={12}>
                            <Typography variant="body1">{props.question}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <hr/>
                        </Grid>
                        <Grid item xs={12}>
                           {props.children}
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={1}>
            {props.next !== 0
            && <Button variant="contained" onClick={()=>{
                props.prevQuestion()
            }}>Prev</Button>}
        </Grid>
        <Grid item xs={8}></Grid>
        <Grid item xs={1}>
            {(props.next + 1) !== props.questionLength
            ?
            <Button variant="contained" onClick={()=>{
                props.nextQuestion()
            }}>Next</Button>:
            <Button variant="contained" onClick={()=>{
                props.submitAnswer()
            }}>Submit</Button>
            }
        </Grid>
        <Grid item xs={1}></Grid>
    </React.Fragment>
    );
}

// type checking for props
QuestionCard.propTypes = {
    question: PropTypes.string,
    questionLength: PropTypes.number,
    next: PropTypes.number,
    options: PropTypes.arrayOf(Object),
    prevQuestion: PropTypes.func,
    nextQuestion: PropTypes.func,
    submitAnswer: PropTypes.func
};
  
// setting default props
QuestionCard.defaultProps = {
    question: '',
    questionLength: 0,
    next: 0,
    options: [],
    prevQuestion: ()=>{},
    nextQuestion: ()=>{},
    submitAnswer: ()=>{}
};

export default QuestionCard;