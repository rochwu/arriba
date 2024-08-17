import {createDroppable} from '@thisbeyond/solid-dnd';
import {mergeProps, Show, type Component} from 'solid-js';
import {styled} from 'solid-styled-components';

import {vars} from '@arriba/css';

import {DropType, Effects} from '../../constants';
import {Shape} from '../../Die';
import type {Effect} from '../../store';

import {Min} from './Min';
import {Specials} from './Specials';

const Container = styled(Shape)({
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
      <Specials effect={mergedProps.effect} />
    </Container>
  );
};
