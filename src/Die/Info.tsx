import type {Accessor, Component} from 'solid-js';
import {For} from 'solid-js';
import {styled} from 'solid-styled-components';

import type {Die} from '../store';

import {DieLike} from './DieLike';
import {Roll} from './Roll';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5em',
  position: 'absolute',
  padding: '0.5em',
  borderRadius: '0.5em',
  transform: 'translateY(calc(-100%))',
  backgroundColor: '#cdaa7d80',
});

const List = styled.div({
  display: 'flex',
  gap: '0.5em',
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

export const Info: Component<{die: Accessor<Die>}> = (props) => {
  return (
    <Container>
      <Name>
        {props.die().name} Age: {props.die().age}
      </Name>
      <List>
        <For each={props.die().faces}>
          {(item, index) => {
            return (
              <Face>
                <Roll>{index() + 1}</Roll>
                {item.value}
              </Face>
            );
          }}
        </For>
      </List>
    </Container>
  );
};
