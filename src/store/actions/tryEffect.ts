import type {EffectId, State} from '../types';

export const tryEffect = (state: State, id: EffectId) => {
  const effect = state.effectById[id];

  const dice = effect.dice
    .filter((id) => id !== null)
    .map((id) => state.dieById[id]);

  if (dice.length === 0) {
    return;
  }

  return {effect, dice};
};
