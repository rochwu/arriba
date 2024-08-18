import type {DieId, EffectId, State} from './types';

export const getSlot = (
  state: State,
  {effect, die}: {effect: EffectId; die: DieId | undefined},
) => {
  return state.effectById[effect].slots.find((slot) => slot.die === die);
};
