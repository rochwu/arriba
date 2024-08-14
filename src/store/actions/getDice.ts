import type {EffectId, State} from '../types';

export const getDice = (state: State, id: EffectId) => {
  return state.effectById[id].dice;
};
