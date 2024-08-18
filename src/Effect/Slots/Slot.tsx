import {createDroppable, useDragDropContext} from '@thisbeyond/solid-dnd';
import {createMemo, Show} from 'solid-js';
import type {Component, JSX} from 'solid-js';
import {styled} from 'solid-styled-components';

import {vars} from '@arriba/css';

import {DropType, Effects} from '../../constants';
import {Shape} from '../../Die';
import {store, type Slot as SlotState} from '../../store';
import {useEffectContext} from '../Provider';

import {Icons} from './Icons';
import {isUnlocked} from './isUnlocked';
import {Min} from './Min';

const Container = styled(Shape)({
  backgroundColor: vars.slot.backgroundColor,
});

export const Slot: Component<{
  slot: SlotState;
  index: number;
}> = (props) => {
  const effect = useEffectContext();
  const [state] = useDragDropContext()!;

  const droppable = createDroppable(`${effect.id}-${props.index}`, {
    type: DropType.Effect,
    id: effect.id,
    order: props.index,
  });

  const min = () => props.slot.min || 1;

  const unlocked = createMemo(() => {
    if (!props.slot.lock) {
      return true;
    }

    return isUnlocked(effect.slots);
  });

  const style = (): JSX.CSSProperties | undefined => {
    const active = droppable.isActiveDroppable;

    if (!active) {
      return;
    }

    const draggable = state.active.draggable!.data;

    const dieId = draggable.id;
    const die = store.dieById[dieId];
    const {roll} = die;

    return {
      'background-color':
        roll >= min() && unlocked() ? vars.slot.allowed : vars.slot.disallowed,
    };
  };

  return (
    <Container
      ref={droppable}
      data-effect={effect.id}
      data-order={props.index}
      style={style()}
    >
      <Show when={effect.id !== Effects.Unplaced}>
        <Min>{min()}</Min>
      </Show>
      <Icons effect={effect} slot={props.slot} />
    </Container>
  );
};
