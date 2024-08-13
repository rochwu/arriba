import {
  DragDropProvider,
  DragDropSensors,
  DragEventHandler,
} from '@thisbeyond/solid-dnd';
import {For, onCleanup, onMount} from 'solid-js';

import {Ghost} from './Die';
import {Effect, Unplaced} from './Effect';
import {actions, store} from './store';

const listener = (event: KeyboardEvent) => {
  if (event.code === 'Space') {
    actions.endTurn();
  }
};

export const Game = () => {
  actions.generate(3);

  onMount(() => {
    window.addEventListener('keydown', listener);

    onCleanup(() => {
      window.removeEventListener('keydown', listener);
    });
  });

  const onDragEnd: DragEventHandler = (event) => {
    const {droppable, draggable} = event;

    console.log(
      JSON.stringify(draggable.data),
      '->',
      JSON.stringify(droppable?.data),
    );

    actions.place({
      dieId: draggable.data.id,
      to: droppable
        ? {
            id: droppable.data.id,
            type: droppable.data.type,
            order: droppable.data.order,
          }
        : {},
    });
  };

  return (
    <DragDropProvider onDragEnd={onDragEnd}>
      <DragDropSensors />

      <For each={store.effects}>{(item) => <Effect identifier={item} />}</For>

      <Unplaced />

      <Ghost />

      <button onClick={actions.endTurn}>End Turn</button>
    </DragDropProvider>
  );
};
