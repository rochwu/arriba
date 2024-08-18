import {Cake} from 'phosphor-solid-js';
import type {Component} from 'solid-js';
import {Index} from 'solid-js';
import {styled} from 'solid-styled-components';

import {vars} from '@arriba/css';

import {Iconed} from '../../Iconed';
import type {Die} from '../../store';
import {DieLike} from '../DieLike';
import {Roll} from '../Roll';
import {Value} from '../Value';

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

const Face = styled(DieLike)({});

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

export const Info: Component<{
  die: Die;
}> = (props) => {
  const faces = () => props.die.faces;

  return (
    <Container>
      <Header>
        <Name die={props.die} />
        <Flex>
          {props.die.age}
          <Iconed Icon={Cake} />
        </Flex>
      </Header>
      <List>
        <Index each={props.die.rolls}>
          {(roll) => (
            <Face>
              <Roll>{roll()}</Roll>
              <Value>{faces()[roll()].value}</Value>
            </Face>
          )}
        </Index>
      </List>
    </Container>
  );
};
