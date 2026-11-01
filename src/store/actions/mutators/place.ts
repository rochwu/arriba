import {Effects} from '@/constants';
import {canPlace} from '@/store/canPlace';
import {getSlot} from '@/store/getSlot';
import type {DieId, EffectId, State} from '@/store/types';

import {instant} from './instant';
import {push} from './push';

export const place = (
  state: State,
  {
    from,
    to = Effects.Unplaced,
    order,
  }: {from: DieId; to?: EffectId; order?: number},
) => {
  // Mirrors where `push` will land the die
  const slots = state.effectById[to].slots;
  const target = order
    ? slots[order]
    : getSlot(state, {effect: to, die: undefined});

  if (target && !canPlace({die: state.dieById[from], slot: target, slots})) {
    return;
  }

  if (instant(state, {die: from, effect: to})) {
    return;
  }

  const die = state.dieById[from];

  const previousEffectId = die.effect;
  const effectId = to;

  if (previousEffectId === effectId) {
    // Allow order changes on same effect
    if (order === undefined) {
      return;
    }
  }

  const openToSlot = getSlot(state, {effect: to, die: undefined});

  if (!openToSlot) {
    return;
  }

  // Cleanup previous effect
  const previousSlot = getSlot(state, {effect: previousEffectId, die: from});
  if (previousSlot) {
    previousSlot.die = undefined;
  }

  let at: number | undefined;
  if (order) {
    at = order;
  } else if (openToSlot) {
    at = openToSlot.id;
  }

  push(state, {
    die: die.id,
    effect: effectId,
    order: at,
  });

  die.effect = effectId;
};
