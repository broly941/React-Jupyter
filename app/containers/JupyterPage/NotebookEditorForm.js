import React, { memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, Dropdown, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { restartKernel, saveNotebook } from './redux/actions';
import { makeSelectEditedCells, makeSelectNotebook } from './redux/selectors';
import NotebookCell from './NotebookCell';

export function NotebookEditorForm({
  notebook,
  saveNotebookFile,
  restart,
  editedCells,
}) {
  const handleSubmit = event => {
    event.preventDefault();
    if (editedCells) {
      const newNotebook = Object.assign({}, notebook);
      newNotebook.content.cells = newNotebook.content.cells.map(
        (cell, index) => {
          const changedCell = editedCells[index];
          return changedCell
            ? Object.assign(cell, { source: changedCell })
            : cell;
        },
      );
      saveNotebookFile(newNotebook);
    }
  };
  const initCells = () =>
    notebook.content.cells.map((cell, index) => (
      <NotebookCell index={index} cell={cell} />
    ));
  return (
    notebook && (
      <Form onSubmit={event => handleSubmit(event)}>
        <Dropdown as={ButtonGroup}>
          <Button variant="success" type="submit">
            Save
          </Button>
          <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => restart()}>
              Restart Kernel
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        {initCells()}
      </Form>
    )
  );
}

NotebookEditorForm.propTypes = {
  notebook: PropTypes.array,
  saveNotebookFile: PropTypes.func,
  restart: PropTypes.func,
  editedCells: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  notebook: makeSelectNotebook(),
  editedCells: makeSelectEditedCells(),
});

export function mapDispatchToProps(dispatch) {
  return {
    saveNotebookFile: notebook => dispatch(saveNotebook(notebook)),
    restart: () => dispatch(restartKernel()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(NotebookEditorForm);
