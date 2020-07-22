import React, { memo } from 'react';
import { Container, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import {
  makeSelectExperiments,
  makeSelectSelectedExperiment,
} from './redux/selectors';
import './ExperimentsNameTable.scss';
import { clearSelectedRun, getRuns, selectExperiment } from './redux/actions';

export function ExperimentsNameTable({
  experiments,
  selectedExperiment,
  selectExperimentId,
  getMlflowRuns,
  clearSelectedRunId,
}) {
  const initiateTable = () =>
    experiments.map(experiment => (
      <tr
        onClick={() => {
          selectExperimentId(experiment.experiment_id);
          clearSelectedRunId();
          getMlflowRuns();
        }}
        className={`${
          selectedExperiment !== experiment.experiment_id
            ? ''
            : 'selected-experiment'
        }`}
      >
        <td>{experiment.name}</td>
      </tr>
    ));

  return (
    experiments && (
      <Container style={{ marginTop: '2rem' }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>FileName:</th>
            </tr>
          </thead>
          <tbody>{initiateTable()}</tbody>
        </Table>
      </Container>
    )
  );
}

ExperimentsNameTable.propTypes = {
  selectExperimentId: PropTypes.func,
  getMlflowRuns: PropTypes.func,
  experiments: PropTypes.array,
  selectedExperiment: PropTypes.string,
  clearSelectedRunId: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  experiments: makeSelectExperiments(),
  selectedExperiment: makeSelectSelectedExperiment(),
});

export function mapDispatchToProps(dispatch) {
  return {
    selectExperimentId: experimentId =>
      dispatch(selectExperiment(experimentId)),
    getMlflowRuns: () => dispatch(getRuns()),
    clearSelectedRunId: () => dispatch(clearSelectedRun()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ExperimentsNameTable);
