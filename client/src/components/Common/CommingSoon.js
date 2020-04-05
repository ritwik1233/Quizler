import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';

class CommingSoon extends React.Component{
    render () {
        return(
            <Grid container spacing={0}>
                <Grid item xs={12}>&nbsp;</Grid>
                <Grid item xs={12}>&nbsp;</Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                    <Paper>
                        <Grid container spacing={0}>
                            <Grid item xs={12}>
                                <Typography variant="h3">Page under construction</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <hr/>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body1">Please come back soon for updates</Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={2}></Grid>
            </Grid>
        )
    }

}
export default CommingSoon;