import {Component, createMemo} from 'solid-js';

import {DieId, store} from '../store';

import {Name} from './Name';
import {Roll} from './Roll';

export const Connected: Component<{identifier: DieId}> = ({identifier}) => {
  const die = createMemo(() => store.dieById[identifier]);
  const value = createMemo(() => {
    const {faces, roll: index} = die();

    return faces[index].value;
  });
  const roll = createMemo(() => die().roll);

  return (
    <>
      {value()}
      <Roll roll={roll} />
      <Name die={die} />
    </>
  );
};
