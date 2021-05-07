import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  Button,
  Link,
  Card,
  CardContent,
  CardActions,
  Avatar,
} from '@material-ui/core';
import { connect, useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import { fetchUser, getAllHomeQuiz } from '../../actions/index.js';
import SearchComponent from '../Common/SearchComponent.js';
import About from '../Common/About.js';

function HomePage(props) {
  const dispatch = useDispatch();
  const [width, setwidth] = useState(window.innerWidth > 1200 ? 8 : 12);

  /*Component did mount */
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth > 1200 ? 8 : 12;
      setwidth(width);
    };
    dispatch(fetchUser());
    dispatch(getAllHomeQuiz());
    window.addEventListener('resize', handleResize);
    /*Component will unmount */
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid
        item
        xs={12}
        style={{
          backgroundColor: 'grey',
        }}
      >
        <About />
      </Grid>
      {width === 8 && <Grid item xs={2}></Grid>}
      <Grid item xs={width}>
        <SearchComponent type="homequiz" />
      </Grid>
      {width === 8 && <Grid item xs={2}></Grid>}
      {props.allQuiz.map((eachQuiz, key) => {
        return (
          <React.Fragment key={key}>
            {width === 8 && <Grid item xs={2}></Grid>}
            <Grid item xs={width}>
              <Card>
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={2}>
                      <Avatar
                        style={{
                          backgroundColor: '#673ab7',
                          width: '50px',
                          height: '50px',
                        }}
                      >
                        {eachQuiz.createdBy.charAt(0)}
                      </Avatar>
                      <br />
                    </Grid>
                    <Grid item xs={10}>
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
                        <strong>Number of Questions:</strong>{' '}
                        {eachQuiz.questions.length}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Created By:</strong> {eachQuiz.createdBy}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions>
                  <Link
                    to={`/confirmtest?q=${eachQuiz._id}`}
                    component={RouterLink}
                  >
                    <Button variant="contained">Open Test</Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
            {width === 8 && <Grid item xs={2}></Grid>}
          </React.Fragment>
        );
      })}
    </Grid>
  );
}

function mapStateToProps(state) {
  return {
    allQuiz: state.home.allQuiz,
  };
}

export default connect(mapStateToProps)(HomePage);
