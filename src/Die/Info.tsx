import type {Accessor, Component} from 'solid-js';
import {Index} from 'solid-js';
import {styled} from 'solid-styled-components';

import {vars} from '@arriba/css';

import type {Die} from '../store';

import {DieLike} from './DieLike';
import {Roll} from './Roll';
import {Value} from './Value';

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

const Name = styled.div({
  alignSelf: 'center',
  width: 'fit-content',
  lineHeight: '1',
  padding: '0 1px',
  borderRadius: '4px',
  backgroundColor: 'white',
  textTransform: 'lowercase',
});

export const Info: Component<{
  die: Accessor<Die>;
}> = (props) => {
  const faces = () => {
    const {faces} = props.die();

    return faces;
  };

  return (
    <Container>
      <Name>
        {props.die().name} Age: {props.die().age}
      </Name>
      <List>
        <Index each={props.die().rolls}>
          {(roll) => {
            return (
              <Face>
                <Roll>{roll()}</Roll>
                <Value>{faces()[roll()].value}</Value>
              </Face>
            );
          }}
        </Index>
      </List>
    </Container>
  );
};
