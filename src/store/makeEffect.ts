import {merge} from 'lodash-es';

import type {Effect} from './types';

type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends object ? RecursivePartial<T[P]> : T[P];
};

export const makeEffect = (args: RecursivePartial<Effect>) => {
  const base: Effect = {} as never;

  const partial = merge({}, base, args);

  partial.slots.forEach((slot, index) => {
    slot.id ??= index;
  });

  return partial;
};
