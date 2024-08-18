import {type Component} from 'solid-js';
import {styled} from 'solid-styled-components';

import {vars} from '@arriba/css';

import {Opponent} from '../../Die';
import type {EffectId} from '../../store';
import {Card} from '../Card';
import {Slots} from '../Slots';
import {useEffect} from '../useEffect';

import {Versus} from './Versus';

const Container = styled.div({
  display: 'flex',
  gap: vars.gap,
  alignItems: 'center',
});

const Title = styled.div({
  display: 'flex',
  alignItems: 'center',
});

export const Fight: Component<{id: EffectId}> = (props) => {
  const {effect} = useEffect(props.id);

  const opponent = () => {
    return effect().special!.opponents![0]!;
  };

  return (
    <Card>
      <Title>{effect().name}</Title>
      <Container>
        <Slots effect={effect()} />
        <Versus effect={effect()} />
        <Opponent id={opponent()} />
      </Container>
    </Card>
  );
};
