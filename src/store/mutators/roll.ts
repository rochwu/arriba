import {random} from 'lodash-es';

import {State} from '../types';

export const roll = (state: State) => {
  Object.values(state.dieById).forEach((die) => {
    die.face = random(0, 5);
  });
};
