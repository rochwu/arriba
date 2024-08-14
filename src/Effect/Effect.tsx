import {createDroppable} from '@thisbeyond/solid-dnd';
import type {Component} from 'solid-js';
import {createMemo} from 'solid-js';
import {styled} from 'solid-styled-components';

import type {EffectId} from '../store';
import {store} from '../store';

import {Dice} from './Dice';

const Container = styled.div({
  border: '1px dashed black',
  padding: '0.5em',
  margin: '0.5em',
});

export const Effect: Component<{identifier: EffectId}> = (props) => {
  const droppable = createDroppable(props.identifier, {
    type: 'effect',
    id: props.identifier,
  });

  const effect = createMemo(() => store.effectById[props.identifier]);

  return (
    <Container ref={droppable} data-effect={props.identifier}>
      {effect().name}
      <Dice effect={effect} />
    </Container>
  );
};
