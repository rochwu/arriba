import type {Accessor, Component} from 'solid-js';
import {Index, Match, Switch} from 'solid-js';
import {styled} from 'solid-styled-components';

import {Die} from '../Die';
import type {Effect} from '../store';

import {Slot} from './Slot';

const Container = styled.div({
  display: 'flex',
  gap: '0.5em',
});

export const Dice: Component<{effect: Accessor<Effect>}> = (props) => {
  return (
    <Container>
      <Index each={props.effect().dice}>
        {(item, index) => {
          return (
            <Switch fallback={<Slot effect={props.effect()} index={index} />}>
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
