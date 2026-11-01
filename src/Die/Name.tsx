import {vars} from '@arriba/css';
import styled from '@emotion/styled';

import {Absolute} from '@/Absolute';
import {color} from '@/Color';

const Position = styled(Absolute)({
  bottom: 0,
  width: '100%',
});

const Text = styled.div((props) => ({
  fontSize: vars.text.small,
  lineHeight: '1',
  textTransform: 'lowercase',
  padding: '0 1px',
  borderRadius: '4px',
  ...color(props, {color: 'black', backgroundColor: vars.die.backgroundColor}),
}));

export const Name = ({children}: {children: string}) => {
  return (
    <Position>
      <Text>{children}</Text>
    </Position>
  );
};
