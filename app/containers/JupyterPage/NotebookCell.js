import React, { memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import './NotebookCell.scss';
import { Alert, Figure, Form } from 'react-bootstrap';
import { saveCellLocally } from './redux/actions';
import { OutputTypes } from '../../share/constants/output-types';

class NotebookCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      source: props.cell.source,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.cell.source !== this.state.source) {
      this.setState({ source: nextProps.cell.source });
    }
  }

  handleChange = event => {
    const source = event.target.value;
    this.setState({ source });
    this.props.saveCell(this.props.index, source);
  };

  initOutputsAlert = () => {
    const { outputs } = this.props.cell;
    if (_.isEmpty(outputs)) {
      return null;
    }
    return outputs.map(output => {
      if (output.output_type === OutputTypes.ERROR) {
        return (
          <Alert variant="danger">
            <Alert.Heading>{output.ename}</Alert.Heading>
            <p>{output.evalue}</p>
          </Alert>
        );
      }
      if (output.output_type === OutputTypes.STREAM) {
        return (
          <Alert variant="danger">
            <Alert.Heading>{output.name}</Alert.Heading>
            <p>{output.text}</p>
          </Alert>
        );
      }
      if (output.output_type === OutputTypes.DISPLAY_DATA) {
        return (
          <Alert variant="light">
            <Figure>
              <Figure.Image
                src={`data:image/jpeg;base64,${output.data['image/png']}`}
              />
            </Figure>
            <Alert.Heading>{output.name}</Alert.Heading>
            <p>{output.text}</p>
          </Alert>
        );
      }
      return null;
    });
  };

  render() {
    return (
      <Form.Group controlId={`ControlTextarea-${this.props.index}`}>
        <Form.Label>{this.props.index + 1}:</Form.Label>
        <Form.Control
          as="textarea"
          rows="10"
          onChange={this.handleChange}
          value={this.state.source}
        />
        {this.initOutputsAlert()}
      </Form.Group>
    );
  }
}

NotebookCell.propTypes = {
  cell: PropTypes.object,
  index: PropTypes.number,
  saveCell: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({});

export function mapDispatchToProps(dispatch) {
  return {
    saveCell: (index, cell) => dispatch(saveCellLocally(index, cell)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(NotebookCell);
