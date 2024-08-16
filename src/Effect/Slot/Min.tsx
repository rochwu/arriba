import {type Component} from 'solid-js';
import {styled} from 'solid-styled-components';

import {Absolute} from '../../Absolute';
import {vars} from '../../css';
import type {Effect} from '../../store';

const SIZE = '12px';

const Position = styled(Absolute)({
  left: '-1px',
  top: '-1px',
  width: SIZE,
  aspectRatio: '1 / 1',
  color: 'black',
  backgroundColor: vars.slot.backgroundColor,
  borderRadius: '0.5em',
});

const Text = styled.div({
  position: 'relative',
  fontSize: SIZE,
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
