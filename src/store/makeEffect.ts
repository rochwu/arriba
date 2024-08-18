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

  if (partial.special) {
    const {special} = partial;

    if (special.turns?.max) {
      special.score ??= Array.from({length: special.turns.max}).map(
        () => 'none',
      );
    }
  }

  partial.description ??= partial.name;

  return partial;
};
