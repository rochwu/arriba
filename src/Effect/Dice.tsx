import type {Accessor, Component} from 'solid-js';
import {Index, Show} from 'solid-js';
import {styled} from 'solid-styled-components';

import {vars} from '@arriba/css';

import {Die} from '../Die';
import type {Effect} from '../store';

import {Slot} from './Slot';

const Container = styled.div({
  display: 'flex',
  gap: vars.gap,
});

export const Dice: Component<{effect: Accessor<Effect>}> = (props) => {
  return (
    <Container>
      <Index each={props.effect().dice}>
        {(item, index) => {
          return (
            <Show
              when={item()}
              fallback={<Slot effect={props.effect()} index={index} />}
              keyed
            >
              {(id) => <Die id={id} />}
            </Show>
          );
        }}
      </Index>
    </Container>
  );
};
