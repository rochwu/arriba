import type {EffectId, State} from './types';

export const getEffect = (state: State, id: EffectId) => {
  return state.effectById[id];
};
