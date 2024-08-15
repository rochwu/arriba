import {createMemo} from 'solid-js';

import type {DieId} from '../store';
import {store} from '../store';

export const useDie = (id: DieId) => {
  const die = createMemo(() => store.dieById[id]);
  const value = createMemo(() => {
    const {faces, roll: index} = die();

    return faces[index].value;
  });

  return {die, value};
};
