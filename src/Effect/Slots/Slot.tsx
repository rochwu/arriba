import {vars} from '@arriba/css';
import styled from '@emotion/styled';

import {Effects} from '@/constants';
import {Shape} from '@/Die';
import {useEffectContext} from '@/Effect/Provider';
import {actions, type Destination, type Slot as SlotState} from '@/store';
import {destinationStyles, useDestination} from '@/useDestination';

import {Icons} from './Icons';
import {Min} from './Min';

const Container = styled(Shape)({
  backgroundColor: vars.slot.backgroundColor,
  ...destinationStyles,
});

export const Slot = ({slot, index}: {slot: SlotState; index: number}) => {
  const effect = useEffectContext();
  const to: Destination = {type: 'effect', id: effect.id, order: index};
  const destination = useDestination({id: `${effect.id}-${index}`, to});

  const click = () => actions.putDown({to});

  return (
    <Container
      ref={destination.setNodeRef}
      data-effect={effect.id}
      data-order={index}
      data-drop={destination.verdict}
      data-over={destination.over}
      onClick={click}
    >
      {effect.id !== Effects.Unplaced && <Min>{slot.min?.roll}</Min>}
      <Icons effect={effect} slot={slot} />
    </Container>
  );
};
