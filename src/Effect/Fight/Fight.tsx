import {vars} from '@arriba/css';
import styled from '@emotion/styled';

import {Opponent} from '../../Die';
import {useEffectContext} from '../Provider';
import {Slots} from '../Slots';

import {Versus} from './Versus';

const Container = styled.div({
  display: 'flex',
  gap: vars.gap,
  alignItems: 'center',
});

export const Fight = () => {
  const effect = useEffectContext();
  const opponent = effect.special!.opponents![0]!;

  return (
    <Container>
      <Slots />
      <Versus />
      <Opponent id={opponent} />
    </Container>
  );
};
