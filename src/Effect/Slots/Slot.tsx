import {createDroppable} from '@thisbeyond/solid-dnd';
import {Show} from 'solid-js';
import type {Component} from 'solid-js';
import {styled} from 'solid-styled-components';

import {vars} from '@arriba/css';

import {DropType, Effects} from '../../constants';
import {Shape} from '../../Die';
import type {Slot as SlotState} from '../../store';
import {useEffectContext} from '../Provider';

import {Min} from './Min';
import {Specials} from './Specials';

const Container = styled(Shape)({
  backgroundColor: vars.slot.backgroundColor,
});

export const Slot: Component<{
  slot: SlotState;
  index: number;
}> = (props) => {
  const effect = useEffectContext();

  const droppable = createDroppable(`${effect.id}-${props.index}`, {
    type: DropType.Effect,
    id: effect.id,
    order: props.index,
  });

  return (
    <Container
      ref={droppable}
      data-effect={effect.id}
      data-order={props.index}
      style={
        droppable.isActiveDroppable
          ? {
              'background-color': vars.die.backgroundColor,
            }
          : undefined
      }
    >
      <Show when={effect.id !== Effects.Unplaced}>
        <Min>{props.slot.min}</Min>
      </Show>
      <Specials effect={effect} slot={props.slot} />
    </Container>
  );
};
