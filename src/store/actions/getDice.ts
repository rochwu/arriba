import {UNPLACED} from '../../constants';
import {EffectId, State} from '../types';

export const getDice = (
  state: State,
  {effect = UNPLACED}: {effect?: EffectId},
) => {
  return state.effectById[effect].dice;
};
