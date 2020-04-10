import React from 'react';
import { Grid, Typography, Card, CardContent, Avatar } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { fetchUser } from '../../actions/index.js';

class ProfilePage extends React.Component {
    state = {
        redirect: '',
    }

    componentDidUpdate(prevProps, prevState) {
        if (!prevProps.currentUser._id && !this.props.currentUser._id && this.state.redirect.length === 0) {
          this.setState({ redirect: '/' });
        }
        if(prevProps.currentUser._id && !this.props.currentUser._id) {
          this.setState({ redirect: '/' });
        }
    };

    componentDidMount () {
        this.props.fetchUser();
    };
    
    render() {
        if(this.state.redirect.length > 0) {
            return (
              <Redirect to={this.state.redirect} />
            );
        } 
        return (
            <Grid container spacing={0}>
                <Grid item xs={12}>&nbsp;</Grid>
                <Grid item xs={12}>&nbsp;</Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}>
                    <Card>
                        <CardContent>
                            {this.props.currentUser._id && <Grid container spacing={0} alignContent="center">
                                <Grid item xs={12}>
                                    <Avatar style={{
                                        backgroundColor: '#673ab7',
                                        width: '50',
                                        height: '50px',
                                    }}>{this.props.currentUser.fname.charAt(0)}</Avatar>
                                </Grid>
                                <Grid item xs={12}>
                                    <hr/>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1">
                                        <strong>Name:</strong> {this.props.currentUser.fname}  {this.props.currentUser.lname}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1">
                                        <strong>Email:</strong> {this.props.currentUser.email}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1">
                                        <strong>Account Status:</strong> {this.props.currentUser.verified ? 'Verified' : 'Not Verified'}
                                    </Typography>
                                </Grid>
                            </Grid>}
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}></Grid>
            </Grid>
        );
    }
};

function mapStateToProps(state) {
    return {
      currentUser: state.auth.currentUser
     }
};

function mapDispatchToProps (dispatch) {
    return bindActionCreators({
      fetchUser
    }, dispatch)
};
    
export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);