import {EFFECTS} from '../constants';

import {effects as rawEffects} from './effects';
import type {State} from './types';

const {[EFFECTS.UNPLACED]: unplaced, ...effects} = rawEffects;

export const initialValue: State = {
  dieById: {},
  effectById: {
    ...effects,
    [EFFECTS.UNPLACED]: unplaced,
  },
  effects: Object.keys(effects),
  turns: 0,
  returning: [],
};
