import type {Component} from 'solid-js';
import {styled} from 'solid-styled-components';

import {Absolute} from '../Absolute';

const SIZE = '12px';

const Position = styled(Absolute)({
  left: '-1px',
  top: '-1px',
  width: SIZE,
  aspectRatio: '1 / 1',
  color: 'white',
  backgroundColor: 'red',
  borderRadius: SIZE,
});

const Text = styled.div({
  fontSize: SIZE,
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
