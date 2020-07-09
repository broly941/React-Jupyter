import React from 'react';
import LoadingIndicator from 'components/LoadingIndicator';
import loadable from '../../share/utils/loadable';

export default loadable(() => import('./index'), {
  fallback: <LoadingIndicator />,
});
