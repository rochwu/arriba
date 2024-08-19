import type {DieId, State} from './types';

export const getDie = (state: State, id: DieId) => {
  return state.dieById[id];
};
