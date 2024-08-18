import type {Component} from 'solid-js';
import {styled} from 'solid-styled-components';

import {vars} from '@arriba/css';

import {RollLike} from './RollLike';

const Position = styled(RollLike)({
  color: vars.die.roll.color,
  backgroundColor: vars.die.roll.backgroundColor,
});

const Text = styled.div({
  fontSize: vars.text.small,
  fontWeight: vars.die.roll.fontWeight,
  lineHeight: 1,
});

export const Roll: Component<{children: string | number}> = (props) => {
  return (
    <Position>
      <Text>{props.children}</Text>
    </Position>
  );
};
