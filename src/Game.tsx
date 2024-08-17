import type {DragEventHandler} from '@thisbeyond/solid-dnd';
import {DragDropProvider, DragDropSensors} from '@thisbeyond/solid-dnd';
import {For, onCleanup, onMount} from 'solid-js';

import {reset} from '@arriba/tooltip';

import {Ghost} from './Die';
import {Effect, Unplaced} from './Effect';
import {EndTurn} from './EndTurn';
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

  const dropped: DragEventHandler = (event) => {
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
    <DragDropProvider onDragEnd={dropped} onDragStart={reset}>
      <DragDropSensors />

      <For each={store.effects}>{(item) => <Effect id={item} />}</For>

      <Unplaced />

      <Ghost />

      <EndTurn />
    </DragDropProvider>
  );
};
