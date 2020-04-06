import React, { useState } from 'react';
import {
   Grid,
   AppBar ,
   Toolbar,
   Typography,
   Link,
   Menu,
   MenuItem,
   Button
} from '@material-ui/core';
import { bindActionCreators } from 'redux';
   
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import { fetchUser } from '../actions/index.js';
import VerifyAccount from './Common/VerifyAccount.js'

const SubHeaderWithoutLogin = () => {
  return (
    <Grid container spacing={3}>
    <Grid item xs={12}>
      <AppBar>
        <Toolbar variant="dense">
          <Grid container spacing={3}>
            <Grid item xs={window.innerWidth<500 ? 9 : 10}>    
              <Link color="inherit" component={RouterLink} to="/">
                <Typography variant="h6" color="inherit">
                  Quizler
                </Typography>
              </Link> 
            </Grid>
            <Grid item xs={window.innerWidth < 500 ? 1: 1}>   
              <Link color="inherit" component={RouterLink} to="/About">
                <Typography variant="body1">About</Typography>
              </Link> 
            </Grid>
            <Grid item xs={window.innerWidth < 500 ? 2: 1}>   
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
const SubHeaderWithLogin = (props) => {
  const [menuStatus, setMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = (event) => {
    setAnchorEl(event.target);
    setMenu(true);
  }
  const closeMenu = (event) => {
    setAnchorEl(null);
    setMenu(false);
    const signOut = event.target.innerHTML;
    if (signOut.includes('Sign Out')) {
      axios.delete('/api/logout')
      .then(() => {
        props.fetchUserData()        
      }).catch(err => {
        console.log(err);
      });
    }
  } 
  return (
    <Grid container spacing={3}>
     <Grid item xs={12}>
      <AppBar>
        <Toolbar variant="dense">
          <Grid container spacing={3}>
            <Grid item xs={ window.innerWidth < 500 ? 9 : 9 }>
              <Link color="inherit" component={RouterLink} to="/">
                <Typography variant="h6" color="inherit">
                  Quizler
                </Typography>
              </Link> 
            </Grid>
            <Grid item xs={window.innerWidth < 500 ? 1: 1}>   
              <Link color="inherit" component={RouterLink} to="/About">
                <Typography variant="body1">About</Typography>
              </Link> 
            </Grid>
            <Grid item xs={ window.innerWidth < 500 ? 2: 2 }>
              <Button
                color="inherit"
                endIcon={<ArrowDropDownIcon />}
                onClick={openMenu}
                >
                {props.currentUser.fname} {props.currentUser.lname}
              </Button> 
            </Grid>
            <Menu
                id="menu-appbar"
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                anchorEl={anchorEl}
                open={menuStatus}
                onClose={closeMenu}>
                <MenuItem onClick={closeMenu}>
                  <Link color="inherit" component={ RouterLink } to="/" style={{ width: '100%' }}>
                    Home
                  </Link>
                </MenuItem>
                <MenuItem onClick={closeMenu}>
                  <Link color="inherit" component={ RouterLink } to="/quiz" style={{ width: '100%' }}>
                    Quiz
                  </Link>
                </MenuItem>
                <MenuItem onClick={closeMenu}>
                  <Link color="inherit" component={ RouterLink } to="/questions" style={{ width: '100%' }}>
                    Questions
                  </Link>
                </MenuItem>
                <MenuItem onClick={closeMenu}>
                  <Link color="inherit" component={ RouterLink } to="/analytics" style={{ width: '100%' }}>
                    Analytics
                  </Link>
                </MenuItem>
                <MenuItem onClick={closeMenu}>
                    Sign Out
                </MenuItem>
            </Menu>
          </Grid>
        </Toolbar>
      </AppBar>
    </Grid>
  </Grid>
  );
}

class Header extends React.Component {
  fetchUserData = () => {
    this.props.fetchUser();
  };
  render() {
    if(this.props.currentUser._id) {
      const verifyComponent = !this.props.currentUser.verified && <VerifyAccount />
      return (
        <React.Fragment>
          <SubHeaderWithLogin currentUser={this.props.currentUser} fetchUserData={this.fetchUserData}/>
          {verifyComponent}
        </React.Fragment>
      );
    }
    return (
      <SubHeaderWithoutLogin />
    );
  };

};
function mapStateToProps(state) {
return {
  currentUser: state.auth.currentUser
 }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    fetchUser
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);