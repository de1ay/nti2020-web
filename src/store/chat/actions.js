import axios from 'axios';

import Group from './actions/group';
import Private from './actions/private';

const actions = {
  ...Group,
  ...Private,
};

export default actions;
