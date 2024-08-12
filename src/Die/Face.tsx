import {Accessor, Component} from 'solid-js';
import {styled} from 'solid-styled-components';
import {Die} from '../store';

const Position = styled.div({
  position: 'absolute',
  left: '1px',
  top: '1px',
});

const Text = styled.div({
  fontSize: '12px',
  fontWeight: 'bold',
  lineHeight: 1,
});

export const Face: Component<{die: Accessor<Die>}> = ({die}) => {
  return (
    <Position>
      <Text>{die().face + 1}</Text>
    </Position>
  );
};
