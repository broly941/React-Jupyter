import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import React, { memo } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AppRouts } from '../../share/constants/route-config';
import { makeSelectIsUserLoggedIn } from '../../containers/App/redux/selectors';

const ProtectedRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: AppRouts.WELCOME, state: { from: props.location } }}
        />
      )
    }
  />
);

ProtectedRoute.propTypes = {
  component: PropTypes.func,
  location: PropTypes.object,
  isLoggedIn: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  isLoggedIn: makeSelectIsUserLoggedIn(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
  memo,
)(ProtectedRoute);
