import type {State} from '../../types';

export const age = (state: State) => {
  state.dice.forEach((die) => {
    state.dieById[die].age += 1;
  });

  state.turns += 1;
};
