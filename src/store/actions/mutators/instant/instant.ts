import {Effects} from '@/constants';
import type {DieId, State} from '@/store/types';

import {fire} from './fire';

// Runs right after a die lands, against the effect it landed in
export const instant = (state: State, {die}: {die: DieId}) => {
  switch (state.dieById[die].effect) {
    case Effects.Fire: {
      fire(state, {die});
      break;
    }
  }
};
