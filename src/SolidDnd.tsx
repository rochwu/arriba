import {
  DragDropProvider,
  DragDropSensors,
  DragEventHandler,
  createDroppable,
} from '@thisbeyond/solid-dnd';
import {Component, For} from 'solid-js';
import {styled} from 'solid-styled-components';

import {Die, Slot} from './Die';
import {EffectId, actions, store} from './store';

const DroppableContainer = styled.div({
  border: '1px dashed black',
  padding: '1em',
});

const Droppable: Component<{identifier: EffectId}> = ({identifier}) => {
  const droppable = createDroppable(identifier, {type: 'effect'});

  return (
    <DroppableContainer ref={droppable} data-effect={identifier}>
      Droppable {identifier}
      <div style={{display: 'flex', gap: '0.5em'}}>
        <For each={store.effectById[identifier].dice}>
          {(item) => {
            if (item) {
              return <Die identifier={item} />;
            }

            return <Slot />;
          }}
        </For>
      </div>
    </DroppableContainer>
  );
};

const Effect: Component<{identifier: EffectId}> = ({identifier}) => {
  return <Droppable identifier={identifier} />;
};

export const SolidDnd = () => {
  actions.generate(6);

  const onDragEnd: DragEventHandler = (event) => {
    const {droppable, draggable} = event;

    actions.place({
      dieId: draggable.id.toString(),
      to: {
        id: droppable?.id.toString(),
        type: droppable?.data.type,
      },
    });
  };

  const endTurn = () => {
    actions.endTurn();
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

      <button onClick={endTurn}>Turn</button>
    </DragDropProvider>
  );
};
