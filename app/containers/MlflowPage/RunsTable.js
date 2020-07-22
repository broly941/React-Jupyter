import React, { memo } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import {
  makeSelectRuns,
  makeSelectSelectedExperiment,
  makeSelectSelectedRun,
} from './redux/selectors';
import './RunsTable.scss';
import { RunTypes } from '../../share/constants/run-types';
import { createRun, deleteRun, selectRun } from './redux/actions';

const useService = selectRunId => {
  const initiateTable = (runs, selectedRun) =>
    runs.map(run => {
      let cv;
      const { params } = run.data;
      if (params !== undefined) {
        cv = params.find(param => param.key === RunTypes.CV).value;
      }
      let nTrees;
      if (params !== undefined) {
        nTrees = params.find(param => param.key === RunTypes.N_TREES).value;
      }
      let randomState;
      if (params !== undefined) {
        randomState = params.find(param => param.key === RunTypes.RANDOM_STATE)
          .value;
      }
      let cvAccuracy;
      const { metrics } = run.data;
      if (metrics !== undefined) {
        cvAccuracy = metrics
          .find(metric => metric.key === RunTypes.CV_ACCURACY)
          .value.toFixed(3);
      }
      let cvError;
      if (metrics !== undefined) {
        cvError = metrics
          .find(metric => metric.key === RunTypes.CV_ERROR)
          .value.toFixed(3);
      }
      let testAccuracy;
      if (metrics !== undefined) {
        testAccuracy = metrics
          .find(metric => metric.key === RunTypes.TEST_ACCURACY)
          .value.toFixed(3);
      }

      return (
        <tr
          onClick={() => {
            selectRunId(run.info.run_id);
          }}
          className={`${selectedRun !== run.info.run_id ? '' : 'selected-run'}`}
        >
          <td>{run.info.status}</td>
          <td>{new Date(+run.info.start_time).toLocaleString()}</td>
          <td>{run.info.user_id}</td>
          <td>{cv}</td>
          <td>{nTrees}</td>
          <td>{randomState}</td>
          <td>{cvAccuracy}</td>
          <td>{cvError}</td>
          <td>{testAccuracy}</td>
        </tr>
      );
    });

  return { initiateTable };
};

export function ExperimentsNameTable({
  runs,
  selectedExperiment,
  selectRunId,
  selectedRun,
  deleteRunById,
  createRunByExperimentId,
}) {
  const { initiateTable } = useService(selectRunId);
  return (
    runs && (
      <Container style={{ marginTop: '2rem' }}>
        <div className="mange-btn-container">
          <Button
            disabled={!selectedExperiment}
            variant="success"
            onClick={() => createRunByExperimentId(selectedExperiment)}
          >
            Create Run
          </Button>{' '}
          <Button
            disabled={!selectedRun}
            variant="danger"
            onClick={() => deleteRunById(selectedRun)}
          >
            Delete Run
          </Button>{' '}
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Status</th>
              <th>Start time</th>
              <th>User</th>
              <th>cv</th>
              <th>n_trees</th>
              <th>randome_state</th>
              <th>cv_accuracy</th>
              <th>cv_error</th>
              <th>test_accuracy</th>
            </tr>
          </thead>
          <tbody>{initiateTable(runs, selectedRun)}</tbody>
        </Table>
      </Container>
    )
  );
}

ExperimentsNameTable.propTypes = {
  runs: PropTypes.array,
  selectedExperiment: PropTypes.string,
  selectedRun: PropTypes.string,
  selectRunId: PropTypes.func,
  deleteRunById: PropTypes.func,
  createRunByExperimentId: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  runs: makeSelectRuns(),
  selectedRun: makeSelectSelectedRun(),
  selectedExperiment: makeSelectSelectedExperiment(),
});

export function mapDispatchToProps(dispatch) {
  return {
    selectRunId: runId => dispatch(selectRun(runId)),
    deleteRunById: runId => dispatch(deleteRun(runId)),
    createRunByExperimentId: experimentId => dispatch(createRun(experimentId)),
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
