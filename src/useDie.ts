import type {DieId} from './store';
import {store} from './store';

export const useDie = (id: DieId) => {
  const die = () => store.dieById[id];
  const value = () => {
    const {faces, roll: index} = die();

    return faces[index].value;
  };

  return {die, value};
};
