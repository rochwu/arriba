import type {Component} from 'solid-js';
import {styled} from 'solid-styled-components';

import {vars} from '@arriba/css';

import {RollLike} from './RollLike';

const Position = styled(RollLike)({
  color: 'white',
  backgroundColor: 'red',
});

const Text = styled.div({
  fontSize: vars.die.roll.size,
  fontWeight: 600,
  lineHeight: 1,
});

export const Roll: Component<{children: string | number}> = (props) => {
  return (
    <Position>
      <Text>{props.children}</Text>
    </Position>
  );
};
