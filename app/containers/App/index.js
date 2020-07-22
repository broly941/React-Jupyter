/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { memo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import './App.scss';

import WelcomePage from 'containers/WelcomePage/Loadable';
import SignUpPage from 'containers/SignUpPage/Loadable';
import HomePage from 'containers/HomePage/Loadable';
import JupyterPage from 'containers/JupyterPage/Loadable';
import MlflowPage from 'containers/MlflowPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectSaga } from '../../share/utils/injectSaga';
import saga from './redux/saga';
import GlobalStyle from '../../global-styles';
import { isLoggedInRequest } from './redux/actions';
import { AppRouts } from '../../share/constants/route-config';
import UnauthorizedRoute from '../../share/components/routes/UnauthorizedRoute';
import ProtectedRoute from '../../share/components/routes/ProtectedRoute';
import { Footer } from '../../share/components/footer';

const key = 'app';

export function App({ isUserLoggedIn }) {
  useInjectSaga({ key, saga });

  useEffect(() => {
    isUserLoggedIn();
  }, []);

  return (
    <div className="mailContainer">
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <Switch>
        <UnauthorizedRoute
          exact
          path={AppRouts.WELCOME}
          component={WelcomePage}
        />
        <UnauthorizedRoute
          exact
          path={AppRouts.SIGN_UP}
          component={SignUpPage}
        />
        <ProtectedRoute exact path={AppRouts.HOME} component={HomePage} />
        <ProtectedRoute exact path={AppRouts.JUPYTER} component={JupyterPage} />
        <ProtectedRoute exact path={AppRouts.MLFLOW} component={MlflowPage} />
        <Route path={AppRouts.NOT_FOUND} component={NotFoundPage} />
      </Switch>
      <Footer />
      <GlobalStyle />
    </div>
  );
}

App.propTypes = {
  isUserLoggedIn: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    isUserLoggedIn: () => dispatch(isLoggedInRequest()),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(App);
