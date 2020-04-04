import React from 'react';
import { Grid, Paper, Typography, List, ListItem, ListItemText } from '@material-ui/core';

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
                                <Typography variant="h3">&nbsp;About</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <hr/>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body1">
                                    &nbsp;Quizler is an open source web application which aims at creating a platform where users:-
                                </Typography> 
                                <List>
                                    <ListItem>
                                        <ListItemText
                                            primary="1. can create their own quiz."
                                            />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary="2. attempt quizes created by others."
                                            />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary="3. share study notes or materials with others(Functionality In progress)"
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary="4. view analytical report for their past attempted quiz(Functionality In progress)"
                                        />
                                    </ListItem>
                                </List>
                                <Typography variant="body1">
                                    &nbsp; Right now the prototype is deployed. Features like study notes sharing, analytical reports etc will be added in near future
                                </Typography> 
                                <Typography variant="body1">
                                    &nbsp; Please provide your feeback by visiting the github repo link :-
                                </Typography>
                                <Typography variant="body1">
                                    &nbsp;<a href="https://github.com/ritwik1233/Quizler/issues">Github Repo Issues</a>
                                </Typography>
                                
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