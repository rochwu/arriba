import {createDroppable} from '@thisbeyond/solid-dnd';
import {Accessor, Component} from 'solid-js';
import {styled} from 'solid-styled-components';

import {Shape} from '../Die';
import {Effect} from '../store';

const Container = styled(Shape)({
  borderColor: 'black',
  borderStyle: 'dashed',
  backgroundColor: '#fff8dc',
});

export const Slot: Component<{
  effect: Accessor<Effect>;
  index: Accessor<number>;
}> = ({effect, index}) => {
  const droppable = createDroppable(`${effect().id}-${index()}`, {
    type: 'effect',
    id: effect().id,
    order: index(),
  });

  return <Container ref={droppable}></Container>;
};
