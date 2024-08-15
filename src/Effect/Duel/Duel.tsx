import {createDroppable} from '@thisbeyond/solid-dnd';
import {type Component} from 'solid-js';
import {styled} from 'solid-styled-components';

import {DropType, Effects} from '../../constants';
import {Card} from '../Card';
import {Dice} from '../Dice';
import {useEffect} from '../useEffect';

import {Opponent} from './Opponent';

const Container = styled.div({
  display: 'flex',
  gap: '0.5em',
  alignItems: 'center',
});

export const Duel: Component = () => {
  const id = Effects.Duel;

  const droppable = createDroppable(id, {
    type: DropType.Effect,
    id,
  });

  const {effect} = useEffect(id);

  return (
    <Card ref={droppable}>
      {effect().name}
      <Container>
        <Dice effect={effect} /> v <Opponent effect={effect()} />
      </Container>
    </Card>
  );
};
