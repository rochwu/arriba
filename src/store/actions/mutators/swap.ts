import {getSlot} from '../../getSlot';
import type {DieId, State} from '../../types';

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

  fromSlot.die = to.id;
  toSlot.die = from.id;

  const effect = from.effect;
  from.effect = to.effect;
  to.effect = effect;
};
