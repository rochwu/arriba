import {vars} from '@arriba/css';
import styled from '@emotion/styled';

import {RollLike} from './RollLike';

const Position = styled(RollLike)({
  color: vars.die.roll.color,
  backgroundColor: vars.die.roll.backgroundColor,
});

const Text = styled.div({
  fontSize: vars.text.small,
  fontWeight: vars.die.roll.fontWeight,
  lineHeight: 1,
});

export const Roll = ({children}: {children: string | number}) => {
  return (
    <Position>
      <Text>{children}</Text>
    </Position>
  );
};
