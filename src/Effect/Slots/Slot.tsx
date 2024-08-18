import {createDroppable} from '@thisbeyond/solid-dnd';
import type {Component} from 'solid-js';
import {styled} from 'solid-styled-components';

import {vars} from '@arriba/css';

import {DropType} from '../../constants';
import {Shape} from '../../Die';
import {Specials} from '../../Die/Slot/Specials';
import type {Effect, Slot as SlotState} from '../../store';

import {Min} from './Min';

const Container = styled(Shape)({
  backgroundColor: vars.slot.backgroundColor,
});

export const Slot: Component<{
  slot: SlotState;
  index: number;
  effect: Effect;
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
      style={
        droppable.isActiveDroppable
          ? {
              'background-color': vars.die.backgroundColor,
            }
          : undefined
      }
    >
      <Min>{props.slot.min}</Min>
      <Specials effect={props.effect} slot={props.slot} />
    </Container>
  );
};
