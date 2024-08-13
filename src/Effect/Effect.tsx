import {createDroppable} from '@thisbeyond/solid-dnd';
import {Component, createMemo} from 'solid-js';
import {styled} from 'solid-styled-components';

import {EffectId, store} from '../store';

import {Dice} from './Dice';

const Container = styled.div({
  border: '1px dashed black',
  padding: '0.5em',
  margin: '0.5em',
});

export const Effect: Component<{identifier: EffectId}> = ({identifier}) => {
  const droppable = createDroppable(identifier, {type: 'effect'});

  const effect = createMemo(() => store.effectById[identifier]);

  return (
    <Container ref={droppable} data-effect={identifier}>
      {effect().name}
      <Dice effect={effect} />
    </Container>
  );
};
