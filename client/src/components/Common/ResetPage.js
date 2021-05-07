import React from 'react';
import { Grid, Paper, Typography, TextField, Button } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

function ResetPage() {
  const [password, setPassword] = React.useState('');
  const [cpassword, setCPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [redirect, setRedirect] = React.useState(false);

  // Component Did Mount Hook
  React.useEffect(() => {
    var urlParams = new URLSearchParams(window.location.search);
    axios
      .get('/api/verifyReset', {
        params: {
          q: urlParams.get('q'),
        },
      })
      .then((res) => {
        if (!res.data) {
          setRedirect(true);
        }
      });
  }, []);

  const onChangePassword = (e) => {
    setPassword(e.target.value);
    setError('');
  };

  const onChangeCPassword = (e) => {
    setCPassword(e.target.value);
    setError('');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const password = password;
    const cpassword = cpassword;
    if (password !== cpassword) {
      setError('Passwords do not match');
      return;
    }
    var urlParams = new URLSearchParams(window.location.search);
    axios
      .get('/api/confirmReset', {
        params: {
          q: urlParams.get('q'),
          password: password,
        },
      })
      .then((res) => {
        if (res.data) {
          setRedirect(true);
        }
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
              <Typography variant="h4">&nbsp;Reset</Typography>
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
                  label="Enter password"
                  type="password"
                  id="password"
                  autoComplete="password"
                  value={password}
                  onChange={onChangePassword}
                  autoFocus
                  required
                  fullWidth
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  label="Enter Confirm password"
                  type="password"
                  id="cpassword"
                  autoComplete="password"
                  value={cpassword}
                  onChange={onChangeCPassword}
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
                  Reset Submit
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
export default ResetPage;
