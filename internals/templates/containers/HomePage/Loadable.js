/**
 * Asynchronously loads the component for HomePage
 */

import loadable from '../../share/utils/loadable';

export default loadable(() => import('./index'));
