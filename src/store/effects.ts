import {Effects} from '../constants';

import {makeDie} from './actions/makeDie';
import {makeFaces} from './actions/makeFaces';
import type {Die, Effect, EffectId} from './types';

type Args = Partial<Omit<Effect, 'id'>> & {id: EffectId};

export const opponents: Die[] = [
  {...makeDie(), age: 13, opponent: true},
  {...makeDie(), age: 17, opponent: true},
];

export const geomentralist = makeDie({
  name: 'Geomentralist',
  age: 666,
  faces: makeFaces([undefined, 6, 6, 6, 6, 6]),
  opponent: true,
});

const create = (...effects: Args[]) => {
  return effects.reduce(
    (result, {id, name, dice, max, special}) => {
      const effect: Effect = {
        id,
        dice:
          dice ??
          (max && max !== Infinity
            ? Array.from({length: max}).map(() => null)
            : [null]),
        name: name ?? id,
        max: max ?? Infinity,
        special,
      } as never;

      return {
        ...result,
        [id]: effect,
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
      special: {
        death: true,
        turned: {
          turns: 3,
          at: 0,
        },
        opponents: opponents.map(({id}) => id),
      },
      max: 1,
    },
    {
      id: Effects.Geometry,
      name: 'Deranged Geomentralist',
      special: {
        turned: {
          turns: 3,
          at: 0,
        },
        death: true,
        opponents: [geomentralist.id],
      },
      max: 2,
    },
    {id: Effects.Unplaced, name: 'Put These to Work', dice: []},
    {
      id: Effects.Fire,
      name: 'Fire',
      max: 1,
      special: {
        instant: true,
      },
    },
    {id: Effects.Summon, max: 1, name: 'Summon'},
  ),
};
