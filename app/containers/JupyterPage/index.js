/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { Breadcrumb, Button, Col, Container, Row } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { useInjectReducer } from '../../share/utils/injectReducer';
import reducer from './redux/reducer';
import saga from './redux/saga';
import history from '../../share/utils/history';
import { useInjectSaga } from '../../share/utils/injectSaga';
import { getFileNamesInDir } from './redux/actions';
import { makeSelectNotebook } from './redux/selectors';
import FileNamesTable from './FileNamesTable';
import 'react-toastify/dist/ReactToastify.css';
import NotebookEditor from './NotebookEditorForm';

const key = 'jupyter';

export function JupyterPage({ getFileNamesInDirectory }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  React.useEffect(() => {
    getFileNamesInDirectory();
  }, []);

  return (
    <Container>
      <ToastContainer />
      <Helmet>
        <title>Jupyter Page</title>
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
            <FileNamesTable />
          </Col>
          <Col md={8}>
            <NotebookEditor />
          </Col>
        </Row>
      </div>
    </Container>
  );
}

JupyterPage.propTypes = {
  getFileNamesInDirectory: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  notebook: makeSelectNotebook(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getFileNamesInDirectory: () => dispatch(getFileNamesInDir()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(JupyterPage);
