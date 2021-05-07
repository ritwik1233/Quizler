import React from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import axios from 'axios';

function VerifyAccount() {
  const [verified, setVerify] = React.useState(false);

  const handleVerify = () => {
    axios.get('/api/verifyLink').then((res) => {
      setVerify(true);
    });
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
        &nbsp;
      </Grid>
      {verified ? (
        <Grid item xs={12}>
          <Typography varaint="body1">
            Verification Link sent please check your email
          </Typography>
        </Grid>
      ) : (
        <Grid item xs={12}>
          <Typography varaint="body1">
            Your account is not verified. To access features of the application
            you need to verify your account.
          </Typography>
        </Grid>
      )}
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleVerify}>
          Verify Account
        </Button>
      </Grid>
    </Grid>
  );
}

export default VerifyAccount;
