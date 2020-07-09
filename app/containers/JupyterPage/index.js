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
import Iframe from 'react-iframe';
import { useInjectReducer } from '../../share/utils/injectReducer';
import { useInjectSaga } from '../../share/utils/injectSaga';
import reducer from './redux/reducer';
// import saga from './saga';
import Button from '../../share/components/Button';
import history from '../../share/utils/history';
import Section from './Section';

const key = 'jupyter';

export function JupyterPage() {
  useInjectReducer({ key, reducer });
  // useInjectSaga({ key, saga });

  return (
    <article>
      <Helmet>
        <title>Jupyter Page</title>
        <meta
          name="description"
          content="A React.js Boilerplate application homepage"
        />
      </Helmet>
      <Section>
        <div>
          <Button onClick={() => history.goBack()}>Back</Button>
        </div>
        <Iframe
          url="https://jaydevs.com/"
          width="100%"
          height="450px"
          id="myId"
          className="myClassname"
          display="initial"
          position="relative"
        />
      </Section>
    </article>
  );
}

JupyterPage.propTypes = {};

const mapStateToProps = createStructuredSelector({});

export function mapDispatchToProps(dispatch) {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(JupyterPage);
