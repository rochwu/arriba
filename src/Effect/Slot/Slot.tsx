import {createDroppable} from '@thisbeyond/solid-dnd';
import type {Component} from 'solid-js';
import {styled} from 'solid-styled-components';

import {DropType} from '../../constants';
import {Shape} from '../../Die';
import type {Effect} from '../../store';

import {Min} from './Min';
import {Type} from './Type';

const Container = styled(Shape)({
  borderColor: 'black',
  borderStyle: 'dashed',
  backgroundColor: 'var(--slot-color)',
});

export const Slot: Component<{
  effect: Effect;
  index: number;
}> = (props) => {
  const droppable = createDroppable(`${props.effect.id}-${props.index}`, {
    type: DropType.Effect,
    id: props.effect.id,
    order: props.index,
  });

  return (
    <Container
      ref={droppable}
      data-effect={props.effect.id}
      data-order={props.index}
    >
      <Min effect={props.effect} />
      <Type effect={props.effect} />
    </Container>
  );
};
