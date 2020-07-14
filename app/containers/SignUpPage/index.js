import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { useInjectReducer } from '../../share/utils/injectReducer';
import messages from './messages';
import { registerRequest } from '../App/redux/actions';
import reducer from './redux/reducer';
import { AppRouts } from '../../share/constants/route-config';
import { ContainerWrapper } from '../../share/components/container-wrapper';
import './SignUpPage.scss';

const key = 'signUp';

export function WelcomePage({ userRegistration }) {
  useInjectReducer({ key, reducer });

  const onSubmitSignUpForm = e => {
    e.preventDefault();
    userRegistration({
      username: e.target.username.value,
      password: e.target.password.value,
    });
  };

  return (
    <ContainerWrapper>
      <ToastContainer />
      <Helmet>
        <title>Sign up Page</title>
        <meta
          name="description"
          content="A React.js Boilerplate application homepage"
        />
      </Helmet>
      <h1>
        <FormattedMessage {...messages.signUpHeader} />
      </h1>
      <Form onSubmit={onSubmitSignUpForm} className="sign-up-page-form">
        <Form.Group controlId="formBasicUserName">
          <Form.Label>Login</Form.Label>
          <Form.Control name="username" type="username" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" type="password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
      <Link to={AppRouts.WELCOME}>
        <Button variant="outline-primary">Log In</Button>
      </Link>
    </ContainerWrapper>
  );
}

WelcomePage.propTypes = {
  userRegistration: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    userRegistration: user => dispatch(registerRequest(user)),
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
