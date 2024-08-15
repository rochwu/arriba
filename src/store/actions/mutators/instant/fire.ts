import type {DieId, State} from '../../../types';
import {getDice} from '../../getDice';

export const fire = (state: State, {die}: {die: DieId}) => {
  const existing = state.dieById[die].effect;

  // TODO: Consolidate removal logic to be more modular

  // Off the effects' bookkeeping
  const dice = getDice(state, existing);
  dice[dice.indexOf(die)] = null;

  // Off the active dice bookkeeping
  const index = state.dice.indexOf(die);
  state.dice.splice(index, 1);

  delete state.dieById[die];

  return true;
};
