import type {Component} from 'solid-js';
import {styled} from 'solid-styled-components';

import {vars} from '@arriba/css';

import type {Die} from '../../store';

const View = styled.div({
  textTransform: 'lowercase',
  fontWeight: 'bold',
});

export const Name: Component<{die: Die}> = (props) => {
  return (
    <View
      style={{
        color: props.die.opponent ? vars.opponent.color : vars.color,
      }}
    >
      {props.die.name}
    </View>
  );
};
