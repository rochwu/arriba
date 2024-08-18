import {Effects} from '../constants';

import {
  beginnerDie,
  geomentralistDie,
  opponents,
  effects as rawEffects,
} from './effects';
import type {State} from './types';

const {[Effects.Unplaced]: unplaced, ...effects} = rawEffects;

export const initialValue: State = {
  dieById: {
    ...[...opponents, beginnerDie, geomentralistDie].reduce((dice, die) => {
      return {
        ...dice,
        [die.id]: die,
      };
    }, {}),
  },
  dice: [beginnerDie.id],
  effectById: {
    ...effects,
    [Effects.Unplaced]: unplaced,
  },
  effects: Object.keys(effects),
  turns: 0,
  returning: [],
};
