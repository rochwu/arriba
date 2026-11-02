import {reset} from '@arriba/tooltip';
import type {DragEndEvent, DragStartEvent} from '@dnd-kit/core';
import {DndContext, PointerSensor, useSensor, useSensors} from '@dnd-kit/core';
import {useEffect} from 'react';

import {Ghost} from './Die';
import {Effect, Unplaced} from './Effect';
import {EndTurn} from './EndTurn';
import type {Destination, DieId} from './store';
import {actions, useStore} from './store';

type DraggableData = {id: DieId};

const listener = (event: KeyboardEvent) => {
  if (event.code === 'Space') {
    actions.endTurn();
  }

  if (event.code === 'Escape') {
    actions.cancel();
  }
};

const blurred = ({target}: MouseEvent) => {
  if (!(target instanceof Element && target.closest('[data-drop]'))) {
    actions.cancel();
  }
};

const started = ({active}: DragStartEvent) => {
  const draggable = active.data.current as DraggableData;

  reset();
  actions.pickUp({id: draggable.id});
};

const dropped = ({over}: DragEndEvent) => {
  const droppable = over?.data.current as Destination | undefined;

  actions.putDown({to: droppable ?? {}});
};

export const Game = () => {
  const effects = useStore((state) => state.effects);

  const sensors = useSensors(
    useSensor(PointerSensor, {activationConstraint: {distance: 10}}),
  );

  useEffect(() => {
    window.addEventListener('keydown', listener);
    // Capture runs before the click lands, while targets still have data-drop
    window.addEventListener('click', blurred, true);

    return () => {
      window.removeEventListener('keydown', listener);
      window.removeEventListener('click', blurred, true);
    };
  }, []);

  return (
    <DndContext
      sensors={sensors}
      onDragStart={started}
      onDragEnd={dropped}
      onDragCancel={actions.cancel}
    >
      {effects.map((id) => (
        <Effect key={id} id={id} />
      ))}

      <Unplaced />

      <Ghost />

      <EndTurn />
    </DndContext>
  );
};
