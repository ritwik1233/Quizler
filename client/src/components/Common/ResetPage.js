import React from 'react';
import { Grid, Paper, Typography, TextField, Button } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class ResetPage extends React.Component {
    state = {
        password: '',
        cpassword: '',
        error: '',
        redirect: false,
    };


    componentDidMount() {
        var urlParams = new URLSearchParams(window.location.search);
        axios.get('/api/verifyReset', { params: {
            q: urlParams.get('q')
        }}).then(res => {
            if(!res.data) {
                this.setState({ redirect: true });
            }  
        });
    };


    onChangePassword = (e) => {
        this.setState({ password: e.target.value, error: '' });
    };

    onChangeCPassword = (e) => {
        this.setState({ cpassword: e.target.value, error: '' });
    };

    onSubmit = (e) => {
        e.preventDefault();
        const password = this.state.password;
        const cpassword = this.state.cpassword;
        if(password !== cpassword) {
            this.setState({ error: 'Password do not match' });
            return;
        }
        var urlParams = new URLSearchParams(window.location.search);
        axios.get('/api/confirmReset', {
            params: {
                q: urlParams.get('q'),
                password: this.state.password
            }
        })
        .then(res => {
            if(res.data) {
                this.setState({ redirect: true });
            }
        });
    };

    render () {
        if(this.state.redirect) {
            return (<Redirect to="/" />);
        }
        return(
            <Grid container spacing={0}>
                <Grid item xs={12}>&nbsp;</Grid>
                <Grid item xs={12}>&nbsp;</Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                    <Paper>
                        <Grid container spacing={0}>
                            <Grid item xs={12}>
                                <Typography variant="h4" >&nbsp;Reset</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <hr/>
                            </Grid>
                            {this.state.error.length > 0&&
                            <React.Fragment>
                                <Grid item xs={4}></Grid>
                                <Grid item xs={4}>
                                    <Typography color="error">{this.state.error}</Typography>
                                </Grid>
                                <Grid item xs={4}></Grid>
                            </React.Fragment>
                            }   
                            <Grid item xs={12}>&nbsp;</Grid>
                            <Grid item xs={1}>
                            </Grid>
                            <Grid item xs={10}>
                                <form onSubmit={this.onSubmit}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        label="Enter password"
                                        type="password"
                                        id="password"
                                        autoComplete="password"
                                        value={this.state.password}
                                        onChange={this.onChangePassword}
                                        autoFocus
                                        required
                                        fullWidth
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        label="Enter Confirm password"
                                        type="password"
                                        id="emaipasswordl"
                                        autoComplete="password"
                                        value={this.state.cpassword}
                                        onChange={this.onChangeCPassword}
                                        autoFocus
                                        required
                                        fullWidth
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary">
                                        Reset Submit
                                    </Button>
                                </form>
                            </Grid>
                            <Grid item xs={1}>
                            </Grid>
                            <Grid item xs={12}>&nbsp;</Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={2}></Grid>
            </Grid>
        )
    }

};

export default ResetPage;