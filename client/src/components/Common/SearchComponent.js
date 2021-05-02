import React from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField, LinearProgress } from '@material-ui/core';
import { connect, useDispatch } from 'react-redux';
import { getAllQuestion, getAllQuiz, getAllHomeQuiz } from '../../actions/index.js';

function SearchComponent(props) {
    const dispatch =  useDispatch();
    const [searchValue, setSearchValue] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    
    // Use Effect Hook For Component Update
    React.useEffect(()=>{
        if(loading) {
            setLoading(false);
        }
    }, [props.allQuestions, props.allQuiz, props.allHomeQuiz]); 
    
    const handleChange = (e) => {
        setSearchValue(e.target.value);
        setLoading(true);
        const type = props.type;
        if(type === 'question') {
            dispatch(getAllQuestion({ searchQuery: e.target.value }));
            return;
        }
        if(type === 'quiz') {
            dispatch(getAllQuiz({ searchQuery: e.target.value }))
            return;
        }
        if(type === 'homequiz'){
            dispatch(getAllHomeQuiz({ searchQuery: e.target.value }))
        }
    };



    return (
    <Grid container spacing={0}>
        {loading &&
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
                value={searchValue}
                onChange={handleChange}
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

function mapStateToProps(state) {
    return {
      allQuestions: state.questions.allQuestions,
      allQuiz: state.quiz.allQuiz,
      allHomeQuiz: state.home.allQuiz
    }
}

// type checking for props
SearchComponent.propTypes = {
    allQuestions: PropTypes.arrayOf(Object),
    allQuiz: PropTypes.arrayOf(Object),
    allHomeQuiz: PropTypes.arrayOf(Object),
  };

// setting default props
SearchComponent.defaultProps = {
    allQuestions: [],
    allQuiz: [],
    allHomeQuiz: []
};
export default connect(mapStateToProps)(SearchComponent);