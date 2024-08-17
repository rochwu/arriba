import type {DieId} from './store';
import {store} from './store';

export const useDie = (id: DieId) => {
  const die = () => store.dieById[id];
  const value = () => {
    const {faces, roll} = die();

    return faces[roll].value;
  };

  return {die, value};
};
