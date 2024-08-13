import {State} from '../../types';

export const age = (state: State) => {
  Object.values(state.dieById).forEach((die) => {
    die.age += 1;
  });
};
