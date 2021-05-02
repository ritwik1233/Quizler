import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Card, CardContent, Avatar } from '@material-ui/core';
import { connect, useDispatch } from 'react-redux';

import { Redirect } from 'react-router-dom';
import { fetchUser } from '../../actions/index.js';

function ProfilePage(props) {
    const [redirect, setRedirect] = React.useState(false);
    const dispatch = useDispatch();
    // Component Did Mount Hook
    React.useEffect(() => {
        dispatch(fetchUser());
    }, []);

    // componentDidUpdate Hook for current User Object
    React.useEffect(() => {
        const _id = props.currentUser._id;
        if(_id !== 'default' && !_id) {
            setRedirect(true);
        }
    }, [props.currentUser]);

    if(redirect) {
        return (
           <Redirect to="/" />
        );
    } 
    return (
    <Grid container spacing={0}>
        <Grid item xs={12}>&nbsp;</Grid>
        <Grid item xs={12}>&nbsp;</Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
            <Card>
                <CardContent>
                    {props.currentUser._id && <Grid container spacing={0} alignContent="center">
                        <Grid item xs={12}>
                            <Avatar style={{
                                backgroundColor: '#673ab7',
                                width: '50px',
                                height: '50px',
                            }}>{props.currentUser.fname.charAt(0)}</Avatar>
                        </Grid>
                        <Grid item xs={12}>
                            <hr/>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1">
                                <strong>Name:</strong> {props.currentUser.fname}  {props.currentUser.lname}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1">
                                <strong>Email:</strong> {props.currentUser.email}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1">
                                <strong>Account Status:</strong> {props.currentUser.verified ? 'Verified' : 'Not Verified'}
                            </Typography>
                        </Grid>
                    </Grid>}
                </CardContent>
            </Card>
        </Grid>
        <Grid item xs={1}></Grid>
    </Grid>
);
};

function mapStateToProps(state) {
    return {
      currentUser: state.auth.currentUser
     }
};


// type checking for props
ProfilePage.propTypes = {
 currentUser: PropTypes.objectOf(Object)
};
  
// setting default props
ProfilePage.defaultProps = {
    currentUser: { _id: 'default' }
};

export default connect(mapStateToProps)(ProfilePage)