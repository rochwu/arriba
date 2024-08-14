import {random} from 'lodash-es';

import type {State} from '../../types';

export const roll = (state: State) => {
  Object.values(state.dieById).forEach((die) => {
    die.roll = random(0, 5);
  });
};
