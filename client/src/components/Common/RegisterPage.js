import React, { useState } from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Avatar,
         Button,
         CssBaseline,
         TextField,
         Typography,
         makeStyles,
         Container 
      } from '@material-ui/core';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const RegisterPage = () => {
  const classes = useStyles();
  const [error, setError] = useState('');
  const [redirect, setRedirect] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.password.value !== e.target.cpassword.value) {
      setError('Password Mismatch');
      return;
    }
    const values = {
      fname: e.target.fname.value,
      lname: e.target.lname.value,
      email: e.target.email.value,
      password: e.target.password.value      
    };
    axios.post('/api/register', values)
    .then(res => {
       setError('');
       setRedirect(true);
    }).catch(err => {
      setError(err.response.data);
    });
  }
  if (redirect) {
    return (
      <Redirect to = '/' />
    );
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        { error.length > 0 && 
          <Typography variant="body1" color="error">{error}</Typography>
        }
        <form className={classes.form} onSubmit = {handleSubmit}>
        <TextField
                variant = 'outlined'
                margin = 'normal'
                required
                fullWidth
                id = 'fname'
                label = 'First Name'
                name = 'fname'
                autoComplete = 'fname'
                autoFocus
              />
              <TextField
                variant = 'outlined'
                margin = 'normal'
                required
                fullWidth
                id = 'lname'
                label = 'Last Name'
                name = 'lname'
                autoComplete = 'lname'
              />
              <TextField
                variant = 'outlined'
                margin = 'normal'
                required
                fullWidth
                id = 'email'
                label = 'Email'
                name = 'email'
                autoComplete = 'email'
              />
              <TextField
                variant = 'outlined'
                margin = 'normal'
                required
                fullWidth
                name = 'password'
                label = 'Password'
                type = 'password'
                id = 'password'
                autoComplete = 'current-password'
              />
              <TextField
                variant = 'outlined'
                margin = 'normal'
                required
                fullWidth
                name = 'cpassword'
                label = 'Confirm Password'
                type = 'password'
                id = 'cpassword'
                autoComplete = 'current-password'
              />
              <Button
                type ='submit'
                fullWidth
                variant = 'contained'
                color = 'primary'>
                Sign Up
              </Button>
        </form>
      </div>
    </Container>
  );
}
export default RegisterPage;
