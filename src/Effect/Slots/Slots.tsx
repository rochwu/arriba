import {Index, Show, type Component} from 'solid-js';
import {styled} from 'solid-styled-components';

import {vars} from '@arriba/css';

import {Die} from '../../Die';
import type {Effect} from '../../store';

import {Slot} from './Slot';

const Container = styled.div({
  display: 'flex',
  gap: vars.gap,
});

export const Slots: Component<{effect: Effect}> = (props) => {
  const slots = () => props.effect.slots;

  return (
    <Container>
      <Index each={slots()}>
        {(slot, index) => (
          <Show
            when={slot().die}
            keyed
            fallback={
              <Slot slot={slot()} effect={props.effect} index={index} />
            }
          >
            {(id) => <Die id={id} />}
          </Show>
        )}
      </Index>
    </Container>
  );
};
