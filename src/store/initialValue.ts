import {Effects} from '../constants';

import {geomentralist, opponents, effects as rawEffects} from './effects';
import type {State} from './types';

const {[Effects.Unplaced]: unplaced, ...effects} = rawEffects;

export const initialValue: State = {
  dieById: {
    ...[...opponents, geomentralist].reduce((dice, die) => {
      return {
        ...dice,
        [die.id]: die,
      };
    }, {}),
  },
  dice: [],
  effectById: {
    ...effects,
    [Effects.Unplaced]: unplaced,
  },
  effects: Object.keys(effects),
  turns: 0,
  returning: [],
};
