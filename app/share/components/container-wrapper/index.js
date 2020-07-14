/*
 * ContainerWrapper
 *
 */
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './ContainerWrapper.scss';
import PropTypes from 'prop-types';

export function ContainerWrapper({ children }) {
  return (
    <div className="content">
      <>{children}</>
    </div>
  );
}

ContainerWrapper.propTypes = {
  children: PropTypes.object,
};
