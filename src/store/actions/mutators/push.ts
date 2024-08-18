import type {DieId, EffectId, State} from '../../types';

export const push = (
  state: State,
  {die, effect, order}: {die: DieId; effect: EffectId; order?: number},
) => {
  const slots = state.effectById[effect].slots;

  if (order) {
    slots[order].die = die;
  } else {
    const open = slots.findIndex(({die}) => die === undefined);

    if (open !== -1) {
      slots[open].die = die;
    } else {
      console.error('push', 'no empty space', die, effect, order);
    }
  }
};
