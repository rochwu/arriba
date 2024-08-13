import {For, createMemo} from 'solid-js';

import {Die} from '../Die';
import {UNPLACED} from '../constants';
import {store} from '../store';

import {Slot} from './Slot';

export const Unplaced = () => {
  const unplaced = createMemo(() => store.effectById[UNPLACED]);

  return (
    <div style={{display: 'flex', gap: '0.5em'}}>
      <For each={unplaced().dice}>
        {(item, index) => {
          if (item) {
            return <Die identifier={item} />;
          }

          return <Slot effect={unplaced} index={index} />;
        }}
      </For>
    </div>
  );
};
