import React from 'react';
import { Grid } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchUser } from '../../actions/index.js';

class HomePage extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }  
  render() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h4> HomePage </h4> 
        </Grid>
      </Grid> 
    );
  }
}
function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    fetchUser
  }, dispatch)
};

export default connect(null, mapDispatchToProps)(HomePage);

