import type {DieId} from './store';
import {useStore} from './store';

export const useDie = (id: DieId) => {
  const die = useStore((state) => state.dieById[id]);
  const value = die.faces[die.roll].value;

  return {die, value};
};
