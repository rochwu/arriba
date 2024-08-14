import type {Component} from 'solid-js';
import {styled} from 'solid-styled-components';

const Position = styled.div({
  display: 'flex',
  justifyContent: 'center',
  position: 'absolute',
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

export const Name: Component<{children: string}> = (props) => {
  return (
    <Position>
      <Text>{props.children}</Text>
    </Position>
  );
};
