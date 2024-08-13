import {DieId, State} from '../../../types';
import {getDice} from '../../getDice';

export const fire = (state: State, {die}: {die: DieId}) => {
  const existing = state.dieById[die].effect;

  const dice = getDice(state, existing);
  dice[dice.indexOf(die)] = null;

  delete state.dieById[die];

  return true;
};
