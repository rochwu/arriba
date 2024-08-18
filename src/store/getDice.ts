import type {EffectId, State} from './types';

export const getDice = (state: State, effect: EffectId) => {
  const slots = state.effectById[effect].slots.filter(
    (slot) => slot.die !== undefined,
  );

  return slots.map(({die}) => state.dieById[die!]);
};
