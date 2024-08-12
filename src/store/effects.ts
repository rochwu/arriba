import {Effect, EffectId} from './types';

const create = (id: string) => {
  return {
    [id]: {
      id,
      dice: [undefined],
    },
  };
};

export const effects: Record<EffectId, Effect> = {
  ...create('one'),
  ...create('two'),
};
