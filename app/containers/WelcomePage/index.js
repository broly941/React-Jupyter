/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import H2 from 'components/H2';
import { Link } from 'react-router-dom';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import { loginRequest } from '../App/actions';
import reducer from './reducer';
import saga from './saga';
import { AppRouts } from '../../constants/route-config';
import Button from '../../components/Button';
import StyledButton from "../../components/Button/StyledButton";

const key = 'welcome';

export function WelcomePage({ userLogin }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const onSubmitLoginForm = event => {
    event.preventDefault();
    userLogin({
      username: event.target.username.value,
      password: event.target.password.value,
    });
  };

  return (
    <article>
      <Helmet>
        <title>Welcome Page</title>
        <meta
          name="description"
          content="A React.js Boilerplate application homepage"
        />
      </Helmet>
      <div>
        <Section>
          <H2>
            <FormattedMessage {...messages.welcomeHeader} />
          </H2>

          <Form onSubmit={onSubmitLoginForm}>
            <label htmlFor="username">
              <Input id="username" type="text" placeholder="login" />
            </label>
            <label htmlFor="password">
              <Input id="password" type="password" placeholder="password" />
            </label>
            <br />
            <br />
            <StyledButton type="submit" value="Submit">
              Log in
            </StyledButton>
          </Form>
          <Link to={AppRouts.SIGN_UP}>
            <Button>Sign up</Button>
          </Link>
        </Section>
      </div>
    </article>
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
