import {Effects} from '../constants';

import {beginnerDice, geomentralistDie, effects as rawEffects} from './effects';
import type {State} from './types';

const {[Effects.Unplaced]: unplaced, ...effects} = rawEffects;

export const initialValue: State = {
  dieById: Object.fromEntries(
    [...beginnerDice, geomentralistDie].map((die) => [die.id, die]),
  ),
  dice: [...beginnerDice.map((die) => die.id)],
  effectById: {
    ...effects,
    [Effects.Unplaced]: unplaced,
  },
  effects: Object.keys(effects),
  turns: 0,
  returning: [],
};
