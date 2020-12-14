import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, authToken, ...rest }) => (
  <Route
    {...rest}
    render=
    {
      props=> authToken ? ( <Component {...props} /> ) : ( <Redirect to="/" /> )
    }
  />
);

const mapStateToProps = state => ({
  authToken: state.AppState.Auth.token
});

export default connect(mapStateToProps)(PrivateRoute);
