import {vars} from '@arriba/css';
import styled from '@emotion/styled';

import {Die} from '@/Die';
import {useEffectContext} from '@/Effect/Provider';

import {Slot} from './Slot';

const Container = styled.div({
  display: 'flex',
  gap: vars.gap,
});

export const Slots = () => {
  const effect = useEffectContext();

  return (
    <Container>
      {effect.slots.map((slot, index) =>
        slot.die ? (
          <Die key={slot.id} id={slot.die} />
        ) : (
          <Slot key={slot.id} slot={slot} index={index} />
        ),
      )}
    </Container>
  );
};
