import {Effects} from '../constants';
import {store} from '../store';

import {Card} from './Card';
import {Slots} from './Slots';

export const Unplaced = () => {
  const unplaced = () => store.effectById[Effects.Unplaced];

  return (
    <Card>
      {unplaced().name}
      <Slots effect={unplaced()} />
    </Card>
  );
};
