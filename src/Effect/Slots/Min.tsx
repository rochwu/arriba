import {vars} from '@arriba/css';
import styled from '@emotion/styled';

import {Absolute} from '../../Absolute';
import {RollLike} from '../../Die';

const Position = styled(RollLike)({
  color: vars.slot.min.color,
});

const Text = styled.div({
  position: 'relative',
  fontSize: vars.text.small,
  fontWeight: vars.die.roll.fontWeight,
  lineHeight: 1,
});

const Plus = styled(Absolute)({
  top: 0,
  left: '100%',
  color: vars.slot.min.color,
});

export const Min = ({children}: {children?: number}) => {
  return (
    <Position>
      <Text>
        {children ?? 1}
        {children !== 6 && <Plus>+</Plus>}
      </Text>
    </Position>
  );
};
