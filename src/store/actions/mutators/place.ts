import {Effects} from '@/constants';
import {getSlot} from '@/store/getSlot';
import type {DieId, EffectId, State} from '@/store/types';

import {push} from './push';

/**
 * The entry point for placing down a die in the store
 * @see push for the primitive
 */
export const place = (
  state: State,
  {
    from,
    to = Effects.Unplaced,
    order,
  }: {from: DieId; to?: EffectId; order?: number},
) => {
  const die = state.dieById[from];

  const previousSlot = getSlot(state, {effect: die.effect, die: from});
  if (previousSlot) {
    previousSlot.die = undefined;
  }

  push(state, {die: from, effect: to, order});

  die.effect = to;
};
