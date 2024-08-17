import {Effects} from '../constants';

import {createDie} from './actions/createDie';
import type {Die, Effect, EffectId} from './types';

type Args = Partial<Omit<Effect, 'id'>> & {id: EffectId};

export const opponents: Die[] = [
  {...createDie(), opponent: true, age: 13},
  {...createDie(), opponent: true, age: 17},
];

const create = (...effects: Args[]) => {
  return effects.reduce(
    (result, {id, name, dice, max, instant, opponents}) => {
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
          instant,
          opponents,
        },
      };
    },
    {} as Record<EffectId, Effect>,
  );
};

export const effects = {
  ...create(
    {
      id: Effects.Duel,
      name: 'Duel to the Death',
      max: 1,
      opponents: opponents.map(({id}) => id),
    },
    {id: Effects.Unplaced, name: 'Put These to Work', dice: []},
    {id: Effects.Fire, name: 'Fire', max: 1, instant: true},
    {id: Effects.Summon, max: 1, name: 'Summon'},
  ),
};
