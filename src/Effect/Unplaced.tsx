import {createMemo} from 'solid-js';

import {Effects} from '../constants';
import {store} from '../store';

import {Card} from './Card';
import {Dice} from './Dice';

export const Unplaced = () => {
  const unplaced = createMemo(() => store.effectById[Effects.Unplaced]);

  return (
    <Card>
      <Dice effect={unplaced} />
    </Card>
  );
};
