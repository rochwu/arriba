import {EFFECTS} from '../../../../constants';
import type {DieId, EffectId, State} from '../../../types';

import {fire} from './fire';

export const instant = (
  state: State,
  {die, effect}: {die: DieId; effect: EffectId},
) => {
  switch (effect) {
    case EFFECTS.FIRE: {
      return fire(state, {die});
    }
  }

  return false;
};
