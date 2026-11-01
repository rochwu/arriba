import {reset} from '@arriba/tooltip';
import type {DragEndEvent} from '@dnd-kit/core';
import {DndContext, PointerSensor, useSensor, useSensors} from '@dnd-kit/core';
import {useEffect} from 'react';

import {Ghost} from './Die';
import {Effect, Unplaced} from './Effect';
import {EndTurn} from './EndTurn';
import type {DieId, EffectId} from './store';
import {actions, useStore} from './store';

type DraggableData = {id: DieId};
type DroppableData = {id: DieId | EffectId; type?: string; order?: number};

const listener = (event: KeyboardEvent) => {
  if (event.code === 'Space') {
    actions.endTurn();
  }
};

export const Game = () => {
  const effects = useStore((state) => state.effects);

  const sensors = useSensors(
    useSensor(PointerSensor, {activationConstraint: {distance: 10}}),
  );

  useEffect(() => {
    window.addEventListener('keydown', listener);

    return () => {
      window.removeEventListener('keydown', listener);
    };
  }, []);

  const dropped = ({active, over}: DragEndEvent) => {
    const draggable = active.data.current as DraggableData;
    const droppable = over?.data.current as DroppableData | undefined;

    console.log(JSON.stringify(draggable), '->', JSON.stringify(droppable));

    actions.place({
      dieId: draggable.id,
      to: droppable
        ? {
            id: droppable.id,
            type: droppable.type,
            order: droppable.order,
          }
        : {},
    });
  };

  return (
    <DndContext sensors={sensors} onDragEnd={dropped} onDragStart={reset}>
      {effects.map((id) => (
        <Effect key={id} id={id} />
      ))}

      <Unplaced />

      <Ghost />

      <EndTurn />
    </DndContext>
  );
};
