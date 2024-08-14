import {random, uniqueId} from 'lodash-es';

import {Effects} from '../../constants';
import {names} from '../../names';

export const createDie = (args?: {values?: number[]; age?: number}) => {
  const {values = [], age = 1} = args ?? {};

  const id = uniqueId('d');

  return {
    id,
    name: names.shift() ?? id,
    roll: random(0, 5),
    faces: Array.from({length: 6}).map((_, index) => ({
      value: values[index] ?? random(1, 6),
      weight: 1,
    })),
    age,
    effect: Effects.Unplaced,
  };
};
