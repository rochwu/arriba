import {canPlace} from '@/store/canPlace';
import {getSlot} from '@/store/getSlot';
import type {DieId, State} from '@/store/types';

export const swap = (
  state: State,
  args: {
    from: DieId;
    to: DieId;
  },
) => {
  const to = state.dieById[args.to];
  const from = state.dieById[args.from];

  const fromSlot = getSlot(state, {effect: from.effect, die: from.id})!;
  const toSlot = getSlot(state, {effect: to.effect, die: to.id})!;

  // Each die has to be allowed in the other's slot
  const fits =
    canPlace({
      die: from,
      slot: toSlot,
      slots: state.effectById[to.effect].slots,
    }) &&
    canPlace({
      die: to,
      slot: fromSlot,
      slots: state.effectById[from.effect].slots,
    });

  if (!fits) {
    return;
  }

  fromSlot.die = to.id;
  toSlot.die = from.id;

  const effect = from.effect;
  from.effect = to.effect;
  to.effect = effect;
};
