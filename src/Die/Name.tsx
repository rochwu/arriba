import type {Component, JSX} from 'solid-js';
import {styled} from 'solid-styled-components';

import {Absolute} from '../Absolute';

const Position = styled(Absolute)({
  bottom: 0,
  width: '100%',
});

const Text = styled.div({
  fontSize: '12px',
  lineHeight: '1',
  textTransform: 'lowercase',
  padding: '0 1px',
  borderRadius: '4px',
  backgroundColor: 'white',
});

export const Name: Component<{children: string; style?: JSX.CSSProperties}> = (
  props,
) => {
  return (
    <Position>
      <Text style={props.style}>{props.children}</Text>
    </Position>
  );
};
