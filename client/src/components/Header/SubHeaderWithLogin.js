import React, {useState} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Grid, AppBar, Toolbar, Typography, Link, Menu, MenuItem, Button} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

function SubHeaderWithLogin(props){
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
              <Grid item xs={ window.innerWidth < 500 ? 10 : 10 }>
                <Link color="inherit" component={RouterLink} to="/">
                  <Typography variant="h6" color="inherit">
                    Quizler
                  </Typography>
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
                    <Link color="inherit" component={ RouterLink } to="/profilepage" style={{ width: '100%' }}>
                      Profile Page
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

// type checking for props
SubHeaderWithLogin.propTypes = {
  currentUser: PropTypes.objectOf(Object),
  fetchUserData: PropTypes.func
};

// setting default props
SubHeaderWithLogin.defaultProps = {
  currentUser: {},
  fetchUserData: ()=>{}
};
export default SubHeaderWithLogin;