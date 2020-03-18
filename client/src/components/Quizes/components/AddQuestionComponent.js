import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';

class AddQuestionComponent extends React.Component {
    render() {
        const questions = this.props.allQuestions.map((eachdata, key)=>{
            return(
                <Grid item xs={12} key={key}>
                    <Typography variant="body1">{eachdata.question}</Typography>
                </Grid>
            )
        })
        return(
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <Paper>
                        <Grid container spacing={0}>
                            <Grid item xs={12}>
                                <Typography variant="h6">Questions</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <hr/>
                            </Grid>
                            {questions}
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}
export default AddQuestionComponent;
