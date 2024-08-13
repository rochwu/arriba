import {random, uniqueId} from 'lodash-es';

import {names} from '../../names';

export const createDie = (args?: {values: number[]}) => {
  const {values = []} = args ?? {};

  const id = uniqueId('d');

  return {
    id,
    name: names.shift() ?? id,
    roll: random(0, 5),
    faces: Array.from({length: 6}).map((_, index) => ({
      value: values[index] ?? random(1, 6),
      weight: 1,
    })),
  };
};
