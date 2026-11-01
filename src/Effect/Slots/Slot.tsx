import {vars} from '@arriba/css';
import {useDndContext, useDroppable} from '@dnd-kit/core';
import styled from '@emotion/styled';
import type {CSSProperties} from 'react';

import {DropType, Effects} from '@/constants';
import {Shape} from '@/Die';
import {useEffectContext} from '@/Effect/Provider';
import type {DieId} from '@/store';
import {canPlace, type Slot as SlotState, useStore} from '@/store';

import {Icons} from './Icons';
import {Min} from './Min';

const Container = styled(Shape)({
  backgroundColor: vars.slot.backgroundColor,
});

export const Slot = ({slot, index}: {slot: SlotState; index: number}) => {
  const effect = useEffectContext();
  const {active} = useDndContext();

  const droppable = useDroppable({
    id: `${effect.id}-${index}`,
    data: {
      type: DropType.Effect,
      id: effect.id,
      order: index,
    },
  });

  const draggedId = active?.data.current?.id as DieId | undefined;
  const dragged = useStore((state) =>
    draggedId ? state.dieById[draggedId] : undefined,
  );

  let style: CSSProperties | undefined;
  if (droppable.isOver && dragged) {
    style = {
      backgroundColor: canPlace({
        die: dragged,
        slot,
        slots: effect.slots,
      })
        ? vars.slot.allowed
        : vars.slot.disallowed,
    };
  }

  return (
    <Container
      ref={droppable.setNodeRef}
      data-effect={effect.id}
      data-order={index}
      style={style}
    >
      {effect.id !== Effects.Unplaced && <Min>{slot.min?.roll}</Min>}
      <Icons effect={effect} slot={slot} />
    </Container>
  );
};
