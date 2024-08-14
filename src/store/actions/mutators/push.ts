import type {DieId, EffectId, State} from '../../types';

export const push = (
  state: State,
  {die, effect, order}: {die: DieId; effect: EffectId; order?: number},
) => {
  const dice = state.effectById[effect].dice;

  if (order) {
    dice[order] = die;
  } else {
    const open = dice.indexOf(null);

    if (open !== -1) {
      dice[open] = die;
    } else {
      dice.push(die);
    }
  }
};
