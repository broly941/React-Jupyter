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
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';

import WelcomePage from 'containers/WelcomePage/Loadable';
import SignUpPage from 'containers/SignUpPage/Loadable';
import HomePage from 'containers/HomePage/Loadable';
import JupyterPage from 'containers/JupyterPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import { connect } from 'react-redux';
import { compose } from 'redux';
import Footer from '../../share/components/Footer';
import { useInjectSaga } from '../../share/utils/injectSaga';
import saga from './redux/saga';
import GlobalStyle from '../../global-styles';
import { isLoggedInRequest } from './redux/actions';
import { AppRouts } from '../../share/constants/route-config';
import UnauthorizedRoute from '../../share/components/routes/UnauthorizedRoute';
import ProtectedRoute from '../../share/components/routes/ProtectedRoute';

const key = 'app';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export function App({ isUserLoggedIn }) {
  useInjectSaga({ key, saga });

  useEffect(() => {
    isUserLoggedIn();
  }, []);

  return (
    <AppWrapper>
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
        <Route path={AppRouts.NOT_FOUND} component={NotFoundPage} />
      </Switch>
      <Footer />
      <GlobalStyle />
    </AppWrapper>
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
