import {Effects} from '../constants';

import type {DieId, Effect, EffectId} from './types';

const create = (
  ...effects: {
    id: string;
    name?: string;
    dice?: DieId[];
    max?: number;
    instant?: boolean;
  }[]
) => {
  return effects.reduce(
    (result, {id, name, dice, max, instant}) => {
      return {
        ...result,
        [id]: {
          id,
          dice:
            dice ??
            (max && max !== Infinity
              ? Array.from({length: max}).map(() => null)
              : [null]),
          name: name ?? id,
          max: max ?? Infinity,
          instant: instant ?? false,
        },
      };
    },
    {} as Record<EffectId, Effect>,
  );
};

export const effects = {
  ...create(
    {id: 'one'},
    {id: Effects.Unplaced, name: 'Milling', dice: []},
    {id: Effects.Fire, name: 'Fire', max: 1, instant: true},
    {id: Effects.Summon, max: 1, name: 'Summon'},
  ),
};
