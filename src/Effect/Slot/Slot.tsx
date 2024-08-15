import {createDroppable} from '@thisbeyond/solid-dnd';
import {mergeProps, type Component} from 'solid-js';
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
  index?: number;
}> = (props) => {
  const mergedProps = mergeProps({index: 0}, props);

  const droppable = createDroppable(
    `${mergedProps.effect.id}-${mergedProps.index}`,
    {
      type: DropType.Effect,
      id: mergedProps.effect.id,
      order: mergedProps.index,
    },
  );

  return (
    <Container
      ref={droppable}
      data-effect={mergedProps.effect.id}
      data-order={mergedProps.index}
    >
      <Min effect={mergedProps.effect} />
      <Type effect={mergedProps.effect} />
    </Container>
  );
};
