import type {Component} from 'solid-js';
import {styled} from 'solid-styled-components';

const SIZE = '12px';

const Position = styled.div({
  display: 'grid',
  placeContent: 'center',
  position: 'absolute',
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

export const Roll: Component<{roll: number}> = (props) => {
  return (
    <Position>
      <Text>{props.roll + 1}</Text>
    </Position>
  );
};
