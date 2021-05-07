import React from 'react';
import { Grid, Paper, Typography, TextField, Button } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

function ForgotPassword() {
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState('');
  const [redirect, setRedirect] = React.useState(false);

  const onChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .get('/api/forgotPassword', {
        params: {
          email: email,
        },
      })
      .then((res) => {
        const result = res.status;
        if (result === 200) {
          setRedirect(true);
          return;
        }
      })
      .catch((err) => {
        setError(err);
      });
  };

  if (redirect) {
    return <Redirect to="/" />;
  }
  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        &nbsp;
      </Grid>
      <Grid item xs={12}>
        &nbsp;
      </Grid>
      <Grid item xs={2}></Grid>
      <Grid item xs={8}>
        <Paper>
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <Typography variant="h4">&nbsp;Forgot Password</Typography>
            </Grid>
            <Grid item xs={12}>
              <hr />
            </Grid>
            {error.length > 0 && (
              <React.Fragment>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}>
                  <Typography color="error">{error}</Typography>
                </Grid>
                <Grid item xs={4}></Grid>
              </React.Fragment>
            )}
            <Grid item xs={12}>
              &nbsp;
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
              <form onSubmit={onSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  label="Enter email"
                  type="text"
                  id="email"
                  autoComplete="email"
                  value={email}
                  onChange={onChange}
                  autoFocus
                  required
                  fullWidth
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Send Confirmation Link
                </Button>
              </form>
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={12}>
              &nbsp;
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={2}></Grid>
    </Grid>
  );
}

export default ForgotPassword;
