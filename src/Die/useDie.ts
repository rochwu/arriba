import {createMemo} from 'solid-js';

import {DieId, store} from '../store';

export const useDie = (identifier: DieId) => {
  const die = createMemo(() => store.dieById[identifier]);
  const value = createMemo(() => {
    const {faces, roll: index} = die();

    return faces[index].value;
  });

  return {die, value};
};
