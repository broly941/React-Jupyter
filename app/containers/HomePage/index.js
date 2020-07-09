import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import H2 from 'components/H2';
import { Link } from 'react-router-dom';
import Section from './Section';
import messages from './messages';
import { logoutRequest } from '../App/actions';
import reducer from './reducer';
// import saga from './saga';
import StyledButton from '../../components/Button/StyledButton';
import Button from '../../components/Button';
import { AppRouts } from '../../constants/route-config';

const key = 'home';

export function HomePage({ onLogout }) {
  useInjectReducer({ key, reducer });
  // useInjectSaga({ key, saga });

  return (
    <article>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="A React.js Boilerplate application homepage"
        />
      </Helmet>
      <div>
        <Section>
          <H2>
            <FormattedMessage {...messages.homeHeader} />
          </H2>
          <StyledButton type="button" onClick={() => onLogout()}>
            Log out
          </StyledButton>
          <Link to={AppRouts.JUPYTER}>
            <Button>Jupyter</Button>
          </Link>
        </Section>
      </div>
    </article>
  );
}

HomePage.propTypes = {
  onLogout: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({});

export function mapDispatchToProps(dispatch) {
  return {
    onLogout: () => dispatch(logoutRequest()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
