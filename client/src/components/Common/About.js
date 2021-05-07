import React from 'react';
import { Grid, Typography, IconButton } from '@material-ui/core';
import GitHub from '@material-ui/icons/GitHub';

function About() {
  const openRepo = () => {
    var a = document.createElement('a');
    a.href = 'https://github.com/ritwik1233/Quizler';
    a.target = '_blank';
    a.click();
  };

  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        &nbsp;
      </Grid>
      <Grid item xs={12}>
        &nbsp;
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={0}>
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
            <Typography
              variant="overline"
              style={{
                color: 'white',
              }}
            >
              Quizler is an open source web application which aims at creating a
              platform where users can create quiz, attempt quizes created by
              others, share materials with others(Functionality In progress),
              view analytical report for their past attempted quiz(Functionality
              In progress)
            </Typography>
            <br />
            <IconButton onClick={openRepo}>
              <GitHub fontSize="large" />
            </IconButton>
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
export default About;
