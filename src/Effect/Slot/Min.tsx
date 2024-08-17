import {type Component} from 'solid-js';
import {styled} from 'solid-styled-components';

import {vars} from '@arriba/css';

import {Absolute} from '../../Absolute';
import {RollLike} from '../../Die';
import type {Effect} from '../../store';

const Position = styled(RollLike)({
  color: vars.slot.min.color,
});

const Text = styled.div({
  position: 'relative',
  fontSize: vars.die.roll.size,
  fontWeight: vars.die.roll.fontWeight,
  lineHeight: 1,
});

const Plus = styled(Absolute)({
  top: 0,
  left: '100%',
  color: vars.slot.min.color,
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
