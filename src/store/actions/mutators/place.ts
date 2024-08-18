import {Effects} from '../../../constants';
import {getSlot} from '../../getSlot';
import type {DieId, EffectId, State} from '../../types';

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

  let at = undefined;
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
