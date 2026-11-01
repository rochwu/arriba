import {vars} from '@arriba/css';
import styled from '@emotion/styled';
import type {ReactNode} from 'react';

import {Card} from './Card';
import {useEffectContext} from './Provider';

const Title = styled.div({});

const Description = styled.div({
  fontSize: vars.text.small,
});

export const Base = ({children}: {children: ReactNode}) => {
  const effect = useEffectContext();

  return (
    <Card>
      <Title>{effect.name}</Title>
      {children}
      <Description>{effect.description}</Description>
    </Card>
  );
};
