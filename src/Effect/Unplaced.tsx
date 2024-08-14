import {createMemo} from 'solid-js';

import {Effects} from '../constants';
import {store} from '../store';

import {Dice} from './Dice';

export const Unplaced = () => {
  const unplaced = createMemo(() => store.effectById[Effects.Unplaced]);

  return (
    <div style={{display: 'flex', gap: '0.5em'}}>
      <Dice effect={unplaced} />
    </div>
  );
};
