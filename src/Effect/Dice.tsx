import {
  Accessor,
  Component,
  For,
  Index,
  Match,
  Switch,
  createMemo,
} from 'solid-js';
import {styled} from 'solid-styled-components';

import {Die} from '../Die';
import {Effect} from '../store';

import {Slot} from './Slot';

const Container = styled.div({
  display: 'flex',
  gap: '0.5em',
});

export const Dice: Component<{effect: Accessor<Effect>}> = ({effect}) => {
  return (
    <Container>
      <Index each={effect().dice}>
        {(item, index) => {
          return (
            <Switch fallback={<Slot effect={effect()} index={index} />}>
              <Match when={item()} keyed>
                {(id) => <Die identifier={id} />}
              </Match>
            </Switch>
          );
        }}
      </Index>
    </Container>
  );
};
