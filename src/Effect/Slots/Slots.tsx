import {Index, Show} from 'solid-js';
import {styled} from 'solid-styled-components';

import {vars} from '@arriba/css';

import {Die} from '../../Die';
import {useEffectContext} from '../Provider';

import {Slot} from './Slot';

const Container = styled.div({
  display: 'flex',
  gap: vars.gap,
});

export const Slots = () => {
  const effect = useEffectContext();

  const slots = () => effect.slots;

  return (
    <Container>
      <Index each={slots()}>
        {(slot, index) => (
          <Show
            when={slot().die}
            keyed
            fallback={<Slot slot={slot()} index={index} />}
          >
            {(id) => <Die id={id} />}
          </Show>
        )}
      </Index>
    </Container>
  );
};
