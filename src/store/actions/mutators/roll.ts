import type {State} from '../../types';
import {roll as getRoll} from '../roll';

export const roll = (state: State) => {
  Object.values(state.dieById).forEach((die) => {
    die.roll = getRoll(die.rolls);
  });
};
