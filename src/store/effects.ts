import {DieId, Effect, EffectId} from './types';

const create = (
  ...effects: {
    id: string;
    name?: string;
    dice?: DieId[];
    max?: number;
  }[]
) => {
  return effects.reduce(
    (result, {id, name, dice, max}) => {
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
        },
      };
    },
    {} as Record<EffectId, Effect>,
  );
};

export const effects: Record<EffectId, Effect> = {
  ...create({id: 'one'}, {id: 'two'}, {id: 'summon', max: 1, name: 'Summon'}),
};
