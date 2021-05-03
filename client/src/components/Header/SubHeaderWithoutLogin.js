import React from "react";
import { Grid, AppBar, Toolbar, Typography, Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
function SubHeaderWithoutLogin() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <AppBar>
          <Toolbar variant="dense">
            <Grid container spacing={3}>
              <Grid item xs={window.innerWidth < 500 ? 9 : 10}>
                <Link color="inherit" component={RouterLink} to="/">
                  <Typography variant="h6" color="inherit">
                    Quizler
                  </Typography>
                </Link>
              </Grid>
              <Grid item xs={window.innerWidth < 500 ? 3 : 2}>
                <Link color="inherit" component={RouterLink} to="/login">
                  <Typography variant="body1">Login</Typography>
                </Link>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Grid>
    </Grid>
  );
}

export default SubHeaderWithoutLogin;
