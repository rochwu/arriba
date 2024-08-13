import {Accessor, Component, For} from 'solid-js';
import {styled} from 'solid-styled-components';

import {Die, Slot} from '../Die';
import {Effect, store} from '../store';

const Container = styled.div({
  display: 'flex',
  gap: '0.5em',
});

export const Dice: Component<{effect: Accessor<Effect>}> = ({effect}) => {
  return (
    <Container>
      <For each={effect().dice}>
        {(item) => {
          if (item) {
            return <Die identifier={item} />;
          }

          return <Slot />;
        }}
      </For>
    </Container>
  );
};
