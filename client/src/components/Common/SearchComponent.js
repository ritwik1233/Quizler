import React from 'react';
import { Grid, TextField, LinearProgress } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getAllQuestion, getAllQuiz } from '../../actions/index.js';
class SearchComponent extends React.Component {
    
    state = {
        searchValue: '',
        loading: false
    }

    handleChange = (e) => {
        this.setState({ searchValue: e.target.value, loading: true });
        const type = this.props.type;
        if(type === 'question') {
            this.props.getAllQuestion({ searchQuery: e.target.value });
            return;
        }
        if(type === 'quiz') {
            this.props.getAllQuiz();
        }
    };

    componentDidUpdate(prevProps, prevState) {
        if(this.state.loading && prevProps.allQuestions !== this.props.allQuestions) {
            this.setState({ loading: false });
        }
        if(this.state.loading && prevProps.allQuiz !== this.props.allQuiz) {
            this.setState({ loading: false });
        }
    };

    render() {
        return (
        <Grid container spacing={0}>
            { 
            this.state.loading &&
                <Grid item xs={12}>
                    <LinearProgress />
                </Grid>
            }
            <Grid item xs={12}>
                <TextField
                    variant="filled"
                    margin="normal"
                    id="question"
                    label="Search"
                    name="question"
                    autoComplete="question"
                    value={this.state.searchValue}
                    onChange={this.handleChange}
                    autoFocus
                    required
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                &nbsp;
            </Grid>
        </Grid>);
    }
}

function mapStateToProps(state) {
    return {
      allQuestions: state.questions.allQuestions,
      allQuiz: state.quiz.allQuiz
    }
}

function mapDispatchToProps (dispatch) {
    return bindActionCreators({
        getAllQuestion,
        getAllQuiz
    }, dispatch)
};
    
export default connect(mapStateToProps, mapDispatchToProps)(SearchComponent);