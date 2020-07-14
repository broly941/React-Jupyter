import React, { memo } from 'react';
import { connect } from 'react-redux';
import { Container, Table } from 'react-bootstrap';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { getNotebook, selectFileName } from './redux/actions';
import {
  makeSelectFileNames,
  makeSelectSelectedFileName,
} from './redux/selectors';
import './FileNamesTable.scss';

export function FileNamesTable({
  fileNames,
  selectName,
  getNotebookData,
  selectedFileName,
}) {
  const initiateTable = () =>
    fileNames
      .filter(fileName => fileName.name.endsWith('.ipynb'))
      .map(fileName => (
        <tbody key={fileName.name}>
          <tr
            onClick={() => {
              selectName(fileName.name);
              getNotebookData();
            }}
            className={`${
              selectedFileName !== fileName.name ? '' : 'selected-file-name'
            }`}
          >
            <td>{fileName.name}</td>
          </tr>
        </tbody>
      ));

  return (
    fileNames && (
      <Container style={{ marginTop: '2rem' }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>FileName:</th>
            </tr>
          </thead>
          {initiateTable()}
        </Table>
      </Container>
    )
  );
}

FileNamesTable.propTypes = {
  fileNames: PropTypes.array,
  selectName: PropTypes.func,
  getNotebookData: PropTypes.func,
  selectedFileName: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  fileNames: makeSelectFileNames(),
  selectedFileName: makeSelectSelectedFileName(),
});

export function mapDispatchToProps(dispatch) {
  return {
    selectName: fileName => dispatch(selectFileName(fileName)),
    getNotebookData: () => dispatch(getNotebook()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(FileNamesTable);
