import {
  DragDropProvider,
  DragDropSensors,
  DragEventHandler,
} from '@thisbeyond/solid-dnd';
import {For} from 'solid-js';

import {Die, GhostDie, Slot} from './Die';
import {Effect} from './Effect';
import {actions, store} from './store';

export const SolidDnd = () => {
  actions.generate(3);

  const onDragEnd: DragEventHandler = (event) => {
    console.log(event);

    const {droppable, draggable} = event;

    actions.place({
      dieId: draggable.id.toString(),
      to: {
        id: droppable?.id.toString(),
        type: droppable?.data.type,
      },
    });
  };

  return (
    <DragDropProvider onDragEnd={onDragEnd}>
      <DragDropSensors />

      <For each={store.effects}>{(item) => <Effect identifier={item} />}</For>

      <div style={{display: 'flex', gap: '0.5em'}}>
        <For each={store.unplaced}>
          {(item) => {
            if (item) {
              return <Die identifier={item} />;
            }

            return <Slot />;
          }}
        </For>
      </div>

      <GhostDie />

      <button onClick={actions.endTurn}>End Turn</button>
    </DragDropProvider>
  );
};
