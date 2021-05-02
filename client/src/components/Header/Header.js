import React from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { fetchUser } from '../../actions/index.js';
import VerifyAccount from '../Common/VerifyAccount.js'
import SubHeaderWithLogin from './SubHeaderWithLogin.js';
import SubHeaderWithoutLogin from './SubHeaderWithoutLogin.js';

function Header(props){
  const dispatch = useDispatch();
  const fetchUserData = () => {
    dispatch(fetchUser());
  };
  if(props.currentUser._id) {
    return (
      <React.Fragment>
        <SubHeaderWithLogin currentUser={props.currentUser} fetchUserData={fetchUserData}/>
        {!props.currentUser.verified && <VerifyAccount />}
      </React.Fragment>
    );
  }
  return (
    <SubHeaderWithoutLogin />
  );
};
function mapStateToProps(state) {
return {
  currentUser: state.auth.currentUser
 }
}

// type checking for props
Header.propTypes = {
  currentUser: PropTypes.objectOf(Object),
};

// setting default props
Header.defaultProps = {
  currentUser: {},
};
export default connect(mapStateToProps)(Header);