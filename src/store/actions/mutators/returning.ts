import {Effects} from '../../../constants';
import type {State} from '../../types';

import {push} from './push';

/**
 * Some die set out on an adventure or something then come back
 */
export const returning = (state: State) => {
  state.returning.forEach((die) => {
    push(state, {die, effect: Effects.Unplaced});
  });

  state.returning = [];
};
