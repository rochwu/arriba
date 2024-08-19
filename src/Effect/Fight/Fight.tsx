import {type Component} from 'solid-js';
import {styled} from 'solid-styled-components';

import {vars} from '@arriba/css';

import {Opponent} from '../../Die';
import {useEffectContext} from '../Provider';
import {Slots} from '../Slots';

import {Versus} from './Versus';

const Container = styled.div({
  display: 'flex',
  gap: vars.gap,
  alignItems: 'center',
});

export const Fight: Component = () => {
  const effect = useEffectContext();
  const opponent = () => {
    return effect.special!.opponents![0]!;
  };
  return (
    <Container>
      <Slots />
      <Versus />
      <Opponent id={opponent()} />
    </Container>
  );
};
