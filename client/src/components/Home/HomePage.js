import React from 'react';
import { Grid, Typography, Button, Link, Card, CardContent, CardActions, Avatar } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import { fetchUser, getAllHomeQuiz, editHomeQuiz } from '../../actions/index.js';
import SearchComponent from '../Common/SearchComponent.js';
import About from '../Common/About.js';

class HomePage extends React.Component {

  componentDidMount() {
    this.props.fetchUser();
    this.props.getAllHomeQuiz();
  };

  openTest = (eachQuiz) => {
    this.props.editHomeQuiz(eachQuiz)
  };

  render() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} style={{
          backgroundColor: 'grey'
        }}>
          <About />
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <SearchComponent type="homequiz" />
        </Grid>
        <Grid item xs={2}></Grid>
        {this.props.allQuiz.map((eachQuiz, key)=>{
          return (
              <React.Fragment key={key}>
                <Grid item xs={2}> 
                </Grid>
               <Grid item xs={8}>
                  <Card>
                    <CardContent>
                      <Grid container spacing={0}>
                        <Grid item xs={1}>
                          <Avatar style={{
                            backgroundColor: '#673ab7',
                            width: '50px',
                            height: '50px'
                          }}>{eachQuiz.createdBy.charAt(0)}</Avatar>
                          <br/>
                        </Grid>
                        <Grid item xs={11}>
                          <Typography variant="body2">
                            <strong>Name:</strong> {eachQuiz.name}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Description:</strong> {eachQuiz.description}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Time:</strong> {eachQuiz.time} min
                          </Typography>
                          <Typography variant="body2">
                            <strong>Number of Questions:</strong> {eachQuiz.questions.length}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Created By:</strong> {eachQuiz.createdBy}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  <CardActions>
                    <Link to="/confirmtest" component={RouterLink}>
                      <Button
                      onClick={()=>{this.openTest(eachQuiz)}}
                      variant="contained"
                      >
                        Open Test 
                      </Button>
                  </Link>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={2}></Grid>
          </React.Fragment>);
        })}
      </Grid> 
    );
  };
};

function mapStateToProps(state) {
  return {
    allQuiz: state.home.allQuiz
   }
};

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    fetchUser,
    getAllHomeQuiz,
    editHomeQuiz
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

