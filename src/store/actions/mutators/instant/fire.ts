import {getSlot} from '../../../getSlot';
import type {DieId, State} from '../../../types';

export const fire = (state: State, {die}: {die: DieId}) => {
  const existing = state.dieById[die].effect;

  // TODO: Consolidate removal logic to be more modular

  // Off the effects' bookkeeping
  const slot = getSlot(state, {effect: existing, die});
  slot!.die = undefined;

  // Off the active dice bookkeeping
  const index = state.dice.indexOf(die);
  state.dice.splice(index, 1);

  delete state.dieById[die];

  return true;
};
