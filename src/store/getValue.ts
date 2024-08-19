import {getDie} from './getDie';
import type {Die, DieId, State} from './types';

export const getValue = (state: State, ...ids: (DieId | Die)[]) => {
  const dice = ids.map((id) => {
    if (typeof id !== 'object') {
      return getDie(state, id);
    }

    return id;
  });

  return dice.reduce((value, die) => {
    return value + die.faces[die.roll].value;
  }, 0);
};
