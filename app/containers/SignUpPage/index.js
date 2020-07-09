import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';

import H2 from 'components/H2';
import { Link } from 'react-router-dom';
import { useInjectReducer } from '../../share/utils/injectReducer';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import { registerRequest } from '../App/redux/actions';
import reducer from './redux/reducer';
// import saga from './saga';
import { AppRouts } from '../../share/constants/route-config';
import Button from '../../components/Button';
import StyledButton from '../../components/Button/StyledButton';

const key = 'signUp';

export function WelcomePage({ userRegistration }) {
  useInjectReducer({ key, reducer });
  // useInjectSaga({ key, saga });

  const onSubmitSignUpForm = event => {
    event.preventDefault();
    userRegistration({
      username: event.target.username.value,
      password: event.target.password.value,
    });
  };

  return (
    <article>
      <Helmet>
        <title>Sign up Page</title>
        <meta
          name="description"
          content="A React.js Boilerplate application homepage"
        />
      </Helmet>
      <div>
        <Section>
          <H2>
            <FormattedMessage {...messages.signUpHeader} />
          </H2>
          <Form onSubmit={onSubmitSignUpForm}>
            <label htmlFor="username">
              <Input id="username" type="text" placeholder="login" />
            </label>
            <label htmlFor="password">
              <Input id="password" type="password" placeholder="password" />
            </label>
            <br />
            <br />
            <StyledButton type="submit" value="Submit">
              Sign up
            </StyledButton>
          </Form>
          <Link to={AppRouts.WELCOME}>
            <Button>Welcome</Button>
          </Link>
        </Section>
      </div>
    </article>
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
