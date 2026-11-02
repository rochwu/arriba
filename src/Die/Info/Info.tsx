import {vars} from '@arriba/css';
import styled from '@emotion/styled';
import {CakeIcon} from '@phosphor-icons/react';
import {Sides} from '@/constants';
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
  '&[data-active=false]': {
    opacity: vars.die.ghost.opacity,
  },
  '&[data-missing=true]': {
    boxSizing: 'border-box',
    backgroundColor: 'transparent',
    border: `1px dashed ${vars.die.backgroundColor}`,
    // Makes it look like the color of ghost
    opacity: vars.die.ghost.opacity,
  },
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
        {Sides.map((side) => {
          const face = die.faces[side];

          return (
            <Face
              key={side}
              data-active={side === die.roll}
              data-missing={!face}
            >
              {face && (
                <>
                  <Roll>{side}</Roll>
                  <Value>{face.value}</Value>
                </>
              )}
            </Face>
          );
        })}
      </List>
    </Container>
  );
};
