import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { Link } from 'react-router-dom';
import { Button, Col, Container, Jumbotron, Row } from 'react-bootstrap';
import { useInjectReducer } from '../../share/utils/injectReducer';
import messages from './messages';
import { logoutRequest } from '../App/redux/actions';
import reducer from './redux/reducer';
import { AppRouts } from '../../share/constants/route-config';
import { ContainerWrapper } from '../../share/components/container-wrapper';
import './HomePage.scss';

const key = 'home';

export function HomePage({ onLogout }) {
  useInjectReducer({ key, reducer });

  return (
    <ContainerWrapper>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          ю
          content="A React.js Boilerplate application homepage"
        />
      </Helmet>
      <Jumbotron>
        <h1>
          <FormattedMessage {...messages.homeHeader} />
        </h1>
        <p>
          This is a simple hero unit, a simple jumbotron-style component for
          calling extra attention to featured content or information.
        </p>
        <p>
          <Button variant="outline-primary" onClick={() => onLogout()}>
            Log out
          </Button>
        </p>
      </Jumbotron>
      <Container>
        <Row className="justify-content-md-center">
          <Col sm="auto">
            <Link to={AppRouts.JUPYTER}>
              <Button>Jupyter</Button>
            </Link>
          </Col>
          <Col sm="auto">
            <Link to={AppRouts.MLFLOW}>
              <Button>Mlflow</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </ContainerWrapper>
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
