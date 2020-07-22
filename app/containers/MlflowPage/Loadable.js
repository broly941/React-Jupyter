import React from 'react';
import LoadingIndicator from '../../share/components/LoadingIndicator';
import loadable from '../../share/utils/loadable';

export default loadable(() => import('./index'), {
  fallback: <LoadingIndicator />,
});
