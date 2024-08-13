import {DieId, EffectId, State} from '../../types';
import {getDice} from '../getDice';

export const place = (
  state: State,
  {from, to}: {from: DieId; to?: EffectId},
) => {
  const die = state.dieById[from];

  const previousEffectId = die.effect;
  const effectId = to;

  if (previousEffectId === effectId) {
    return;
  }

  const nextDice = getDice(state, {effect: effectId});
  const openNextIndex = nextDice.indexOf(null);

  if (effectId) {
    const effect = state.effectById[effectId];

    // If limited slots and can't find undefined means it's filled
    if (effect.max !== Infinity && openNextIndex === -1) {
      return;
    }
  }

  // Cleanup previous effect
  const previousDice = getDice(state, {effect: previousEffectId});
  const previousIndex = previousDice.indexOf(die.id);
  previousDice[previousIndex] = null;

  // Set next effect
  if (openNextIndex !== -1) {
    nextDice[openNextIndex] = die.id;
  } else {
    nextDice.push(die.id);
  }

  die.effect = effectId;
};
