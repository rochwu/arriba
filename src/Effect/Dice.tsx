import {Accessor, Component, For} from 'solid-js';
import {styled} from 'solid-styled-components';

import {Die} from '../Die';
import {Effect, store} from '../store';

import {Slot} from './Slot';

const Container = styled.div({
  display: 'flex',
  gap: '0.5em',
});

export const Dice: Component<{effect: Accessor<Effect>}> = ({effect}) => {
  return (
    <Container>
      <For each={effect().dice}>
        {(item, index) => {
          if (item) {
            return <Die identifier={item} />;
          }

          return <Slot effect={effect} index={index} />;
        }}
      </For>
    </Container>
  );
};
