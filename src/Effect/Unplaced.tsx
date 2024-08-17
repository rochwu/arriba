import {Effects} from '../constants';
import {store} from '../store';

import {Card} from './Card';
import {Dice} from './Dice';

export const Unplaced = () => {
  const unplaced = () => store.effectById[Effects.Unplaced];

  return (
    <Card>
      {unplaced().name}
      <Dice effect={unplaced} />
    </Card>
  );
};
