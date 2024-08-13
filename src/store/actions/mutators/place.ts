import {DieId, EffectId, State} from '../../types';
import {getDice} from '../getDice';

export const place = (
  state: State,
  {from, to, order}: {from: DieId; to?: EffectId; order?: number},
) => {
  const die = state.dieById[from];

  const previousEffectId = die.effect;
  const effectId = to;

  if (previousEffectId === effectId) {
    return;
  }

  const toDice = getDice(state, {effect: effectId});
  const openIndex = toDice.indexOf(null);

  if (effectId) {
    const effect = state.effectById[effectId];

    // If limited slots and can't find null means it's filled
    if (effect.max !== Infinity && openIndex === -1) {
      return;
    }
  }

  // Cleanup previous effect
  const fromDice = getDice(state, {effect: previousEffectId});
  const fromIndex = fromDice.indexOf(die.id);
  fromDice[fromIndex] = null;

  if (order) {
    toDice[order] = die.id;
  } else {
    // Set next effect
    if (openIndex !== -1) {
      toDice[openIndex] = die.id;
    } else {
      toDice.push(die.id);
    }
  }

  die.effect = effectId;
};
