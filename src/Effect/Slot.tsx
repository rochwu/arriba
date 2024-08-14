import {createDroppable} from '@thisbeyond/solid-dnd';
import type {Component} from 'solid-js';
import {styled} from 'solid-styled-components';

import {Shape} from '../Die';
import type {Effect} from '../store';

const Container = styled(Shape)({
  borderColor: 'black',
  borderStyle: 'dashed',
  backgroundColor: '#fff8dc',
});

export const Slot: Component<{
  effect: Effect;
  index: number;
}> = (props) => {
  const droppable = createDroppable(`${props.effect.id}-${props.index}`, {
    type: 'effect',
    id: props.effect.id,
    order: props.index,
  });

  return (
    <Container
      ref={droppable}
      data-effect={props.effect.id}
      data-order={props.index}
    />
  );
};
