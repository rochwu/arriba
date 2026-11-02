import type {DieId, EffectId, State} from '@/store/types';

/**
 * The purest form of placing down a die in the store
 */
export const push = (
  state: State,
  {die, effect, order}: {die: DieId; effect: EffectId; order?: number},
) => {
  const slots = state.effectById[effect].slots;

  if (order !== undefined) {
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
