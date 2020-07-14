import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useInjectReducer } from '../../share/utils/injectReducer';
import messages from './messages';
import { loginRequest } from '../App/redux/actions';
import reducer from './redux/reducer';
import { ContainerWrapper } from '../../share/components/container-wrapper';
import { AppRouts } from '../../share/constants/route-config';
import './WelcomePage.scss';

const key = 'welcome';

export function WelcomePage({ userLogin }) {
  useInjectReducer({ key, reducer });

  const onSubmitLoginForm = event => {
    event.preventDefault();
    userLogin({
      username: event.target.username.value,
      password: event.target.password.value,
    });
  };

  return (
    <ContainerWrapper>
      <ToastContainer />
      <Helmet>
        <title>Welcome Page</title>
        <meta
          name="description"
          content="A React.js Boilerplate application Welcome Page"
        />
      </Helmet>
      <h1>
        <FormattedMessage {...messages.welcomeHeader} />
      </h1>
      <Form onSubmit={onSubmitLoginForm} className="welcome-page-form">
        <Form.Group controlId="formBasicUserName">
          <Form.Label>Login</Form.Label>
          <Form.Control name="username" type="username" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" type="password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Log In
        </Button>
      </Form>
      <Link to={AppRouts.SIGN_UP}>
        <Button variant="outline-primary">Sign up</Button>
      </Link>
    </ContainerWrapper>
  );
}

WelcomePage.propTypes = {
  userLogin: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    userLogin: user => dispatch(loginRequest(user)),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(WelcomePage);
