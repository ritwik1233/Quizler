import React from 'react';
import { connect } from 'react-redux';
import { Grid, Typography, Paper, Container,
    ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Checkbox, Button } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import SearchComponent from '../../Common/SearchComponent.js';

class QuizModalComponent extends React.Component {

    state = {
        checkedArray: [],
        selectedQuestions: this.props.selectedQuestions
    }

    handleChange = (_id) => {
        const checkedArray = this.state.checkedArray.map((each) => {
            if(each[_id] !== undefined) {
                const obj = each;
                obj[_id] = !obj[_id]
                return obj;
            }
            return { ...each };
        });
        this.setState({ checkedArray });
    };

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.allQuestions !== this.props.allQuestions) {
            const checkedArray = this.props.allQuestions.map((each, i) => {
                const _id = each._id;
                const obj = {};
                obj[_id] = false;
                return obj;
            });
            this.setState({ checkedArray })
        }
    };

    componentDidMount() {
        if(this.props.allQuestions.length) {
            const checkedArray = this.props.allQuestions.map((each, i) => {
                const _id = each._id;
                const obj = {};
                const findIndex = this.props.selectedQuestions.find(q => {
                    return q._id === each._id 
                });
                if(findIndex) {
                    obj[_id] = true;
                    return obj;
                } else {
                    obj[_id] = false;
                    return obj;
                }
            });
            this.setState({ checkedArray })
        }
    };

    componentWillUnmount() {
        this.props.getAllQuestion();
    };

    addQuestionData = () => {
        const checkedArray = this.state.checkedArray.filter(each => {
            const keys = Object.keys(each);
            return each[keys[0]];
        });
        this.props.addQuestionData(checkedArray);
    };

    render() {
        return (
            <Grid container spacing={0}>
            <Grid item xs={12}>
                <Paper>
                    <Container fixed>
                        <Grid container spacing={0}>
                            <Grid item xs={12}>&nbsp;</Grid>
                            <Grid item xs={12}>
                                <Typography variant="h4">Questions</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <hr/>
                            </Grid>
                            <Grid item xs={12}>
                                <SearchComponent type="question" />
                            </Grid>
                            <Grid item xs={12}>
                                &nbsp;
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={0}>
                                    {this.props.allQuestions.map((question,key) => {
                                        return(
                                            <React.Fragment key={key}>
                                                <Grid item xs={1}>
                                                {this.state.checkedArray.length > 0 && <Checkbox
                                                    checked={this.state.checkedArray[key][question._id]}
                                                    onChange={()=>{ 
                                                        this.handleChange(question._id); 
                                                    }}
                                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                                />}
                                                </Grid>
                                                <Grid item xs={11}>
                                                    <ExpansionPanel>
                                                        <ExpansionPanelSummary
                                                            expandIcon={<ExpandMoreIcon />}
                                                            aria-controls="panel1a-content"
                                                            id="panel1a-header">
                                                                <Typography>{question.question}</Typography>
                                                        </ExpansionPanelSummary>
                                                        <ExpansionPanelDetails>
                                                            <Grid container spacing={3}>
                                                                {question.options.map((option, key) => {
                                                                    return (
                                                                        <React.Fragment key={key}>
                                                                            <Grid item xs={6}>
                                                                                <Typography variant="body1">{option.description}</Typography>
                                                                            </Grid>
                                                                            <Grid item xs={2}>
                                                                                <Typography variant="body1">{ option.correct?'Correct': 'Incorrect' }</Typography>
                                                                            </Grid>
                                                                        </React.Fragment>
                                                                    );
                                                                })}
                                                            </Grid>
                                                        </ExpansionPanelDetails>
                                                    </ExpansionPanel>
                                                    <br/>
                                                </Grid>
                                            </React.Fragment>
                                        );
                                    })}
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick = {this.addQuestionData}
                                > 
                                Add 
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                &nbsp;
                            </Grid>
                        </Grid>
                    </Container>
                </Paper>
            </Grid>
        </Grid>
        );
    };
};

function mapStateToProps(state) {
    return {
      allQuestions: state.questions.allQuestions,
    }
}

export default connect(mapStateToProps, null, null,  { forwardRef: true })(QuizModalComponent);