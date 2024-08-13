import {UNPLACED} from '../constants';

import {effects} from './effects';
import {State} from './types';

export const initialValue: State = {
  dieById: {},
  effectById: {
    ...effects,
    [UNPLACED]: {
      id: UNPLACED,
      name: 'Milling',
      dice: [],
      max: Infinity,
    },
  },
  effects: Object.keys(effects),
  turns: 0,
};
