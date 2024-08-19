import type {Component, JSX} from 'solid-js';
import {styled} from 'solid-styled-components';

import {vars} from '@arriba/css';

import {Card} from './Card';
import {useEffectContext} from './Provider';

const Title = styled.div({});

const Description = styled.div({
  fontSize: vars.text.small,
});

export const Base: Component<{children: JSX.Element}> = (props) => {
  const effect = useEffectContext();

  return (
    <Card>
      <Title>{effect.name}</Title>
      {props.children}
      <Description>{effect.description}</Description>
    </Card>
  );
};
