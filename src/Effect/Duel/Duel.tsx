import {type Component} from 'solid-js';
import {styled} from 'solid-styled-components';

import {vars} from '@arriba/css';

import {Opponent} from '../../Die';
import type {EffectId} from '../../store';
import {Card} from '../Card';
import {Dice} from '../Dice';
import {useEffect} from '../useEffect';

const Container = styled.div({
  display: 'flex',
  gap: vars.gap,
  alignItems: 'center',
});

export const Duel: Component<{id: EffectId}> = (props) => {
  const {effect} = useEffect(props.id);

  const opponent = () => {
    return effect().special!.opponents![0]!;
  };

  return (
    <Card>
      {effect().name}
      <Container>
        <Dice effect={effect} /> v <Opponent id={opponent()} />
      </Container>
    </Card>
  );
};
