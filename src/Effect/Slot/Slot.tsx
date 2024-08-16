import {createDroppable} from '@thisbeyond/solid-dnd';
import {mergeProps, Show, type Component} from 'solid-js';
import {styled} from 'solid-styled-components';

import {DropType, Effects} from '../../constants';
import {vars} from '../../css';
import {Shape} from '../../Die';
import type {Effect} from '../../store';

import {Min} from './Min';
import {Types} from './Types';

const Container = styled(Shape)({
  borderColor: vars.slot.backgroundColor,
  backgroundColor: vars.slot.backgroundColor,
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
      <Show when={props.effect.id !== Effects.Unplaced}>
        <Min effect={mergedProps.effect} />
      </Show>
      <Types effect={mergedProps.effect} />
    </Container>
  );
};
