import {effects} from './effects';
import {State} from './types';

export const initialValue: State = {
  dieById: {},
  effectById: {
    ...effects,
  },
  effects: Object.keys(effects),
  unplaced: [],
  turns: 0,
};
