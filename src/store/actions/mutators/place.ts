import {EFFECTS} from '../../../constants';
import type {DieId, EffectId, State} from '../../types';
import {getDice} from '../getDice';

import {instant} from './instant';
import {push} from './push';

export const place = (
  state: State,
  {
    from,
    to = EFFECTS.UNPLACED,
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

  const toDice = getDice(state, effectId);
  const openIndex = toDice.indexOf(null);

  if (effectId) {
    const effect = state.effectById[effectId];

    // If limited slots and can't find null means it's filled
    if (effect.max !== Infinity && openIndex === -1) {
      return;
    }
  }

  // Cleanup previous effect
  const fromDice = getDice(state, previousEffectId);
  const fromIndex = fromDice.indexOf(die.id);
  fromDice[fromIndex] = null;

  let at = undefined;
  if (order) {
    at = order;
  } else if (openIndex !== -1) {
    at = openIndex;
  }

  push(state, {
    die: die.id,
    effect: effectId,
    order: at,
  });

  die.effect = effectId;
};
