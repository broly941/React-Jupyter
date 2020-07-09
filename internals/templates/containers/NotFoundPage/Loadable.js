/**
 * Asynchronously loads the component for NotFoundPage
 */

import loadable from '../../share/utils/loadable';

export default loadable(() => import('./index'));
