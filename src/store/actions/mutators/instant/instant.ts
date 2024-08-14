import {Effects} from '../../../../constants';
import type {DieId, EffectId, State} from '../../../types';

import {fire} from './fire';

export const instant = (
  state: State,
  {die, effect}: {die: DieId; effect: EffectId},
) => {
  switch (effect) {
    case Effects.Fire: {
      return fire(state, {die});
    }
  }

  return false;
};
