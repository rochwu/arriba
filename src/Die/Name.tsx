import {Accessor, Component} from 'solid-js';
import {styled} from 'solid-styled-components';

import {Die} from '../store';

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
  borderRadius: '2px',
  backgroundColor: 'white',
});

export const Name: Component<{die: Accessor<Die>}> = ({die}) => {
  return (
    <Position>
      <Text>{die().name}</Text>
    </Position>
  );
};
