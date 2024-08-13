import {EffectId, State} from '../types';

export const getDice = (state: State, {effect}: {effect?: EffectId}) => {
  return effect ? state.effectById[effect].dice : state.unplaced;
};
