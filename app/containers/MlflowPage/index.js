import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { useInjectReducer } from '../../share/utils/injectReducer';
import reducer from './redux/reducer';
import saga from './redux/saga';
import history from '../../share/utils/history';
import { useInjectSaga } from '../../share/utils/injectSaga';
import 'react-toastify/dist/ReactToastify.css';
import { getMlflowExperiments } from './redux/actions';
import ExperimentsNameTable from './ExperimentsNameTable';
import RunsTable from './RunsTable';

const key = 'mlflow';

export function MlflowPage({ getExperimentsList }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  React.useEffect(() => {
    getExperimentsList();
  }, []);

  return (
    <Container fluid>
      <ToastContainer />
      <Helmet>
        <title>Mlflow Page</title>
        <meta
          name="description"
          content="A React.js Boilerplate application homepage"
        />
      </Helmet>
      <div style={{ paddingTop: '2rem' }}>
        <Button variant="outline-primary" onClick={() => history.goBack()}>
          Back
        </Button>
        <Row>
          <Col md={4}>
            <ExperimentsNameTable />
          </Col>
          <Col md={8}>
            <RunsTable />
          </Col>
        </Row>
      </div>
    </Container>
  );
}

MlflowPage.propTypes = {
  getExperimentsList: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    getExperimentsList: () => dispatch(getMlflowExperiments()),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(MlflowPage);
