import {vars} from '@arriba/css';
import styled from '@emotion/styled';
import {CakeIcon} from '@phosphor-icons/react';
import {DieLike} from '@/Die/DieLike';
import {Roll} from '@/Die/Roll';
import {Value} from '@/Die/Value';
import {Iconed} from '@/Iconed';
import type {Die} from '@/store';

import {Name} from './Name';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.gap,
});

const List = styled.div({
  display: 'flex',
  gap: vars.gap,
});

const Face = styled(DieLike)({
  opacity: vars.die.ghost.opacity,
  '&[data-active=true]': {opacity: 1},
});

const Header = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  lineHeight: '1',
  padding: '0 1px',
  borderRadius: '4px',
  textTransform: 'lowercase',
});

const Flex = styled.div({
  display: 'flex',
  alignItems: 'center',
});

export const Info = ({die}: {die: Die}) => {
  return (
    <Container>
      <Header>
        <Name die={die} />
        <Flex>
          {die.age}
          <Iconed Icon={CakeIcon} />
        </Flex>
      </Header>
      <List>
        {die.rolls.map((roll, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: rolls are positional and can repeat
          <Face key={index} data-active={roll === die.roll}>
            <Roll>{roll}</Roll>
            <Value>{die.faces[roll].value}</Value>
          </Face>
        ))}
      </List>
    </Container>
  );
};
