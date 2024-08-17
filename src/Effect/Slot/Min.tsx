import {type Component} from 'solid-js';
import {styled} from 'solid-styled-components';

import {vars} from '@arriba/css';

import {Absolute} from '../../Absolute';
import {RollLike} from '../../Die';
import type {Effect} from '../../store';

const Position = styled(RollLike)({
  color: 'black',
});

const Text = styled.div({
  position: 'relative',
  fontSize: vars.die.roll.size,
  fontWeight: 600,
  lineHeight: 1,
});

const Plus = styled(Absolute)({
  position: 'absolute',
  top: 0,
  left: '100%',
  color: 'black',
});

export const Min: Component<{effect: Effect}> = (prop) => {
  return (
    <Position>
      <Text>
        1<Plus>+</Plus>
      </Text>
    </Position>
  );
};
