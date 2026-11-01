import {roll as getRoll} from '@/store/actions/roll';
import type {State} from '@/store/types';

export const roll = (state: State) => {
  Object.values(state.dieById).forEach((die) => {
    die.roll = getRoll(die.rolls);
  });
};
