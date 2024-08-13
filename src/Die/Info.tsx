import {Accessor, Component, For, createMemo} from 'solid-js';
import {styled} from 'solid-styled-components';

import {Die} from '../store';

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

export const Info: Component<{die: Accessor<Die>}> = ({die}) => {
  return (
    <Container>
      <Name>
        {die().name} Age: {die().age}
      </Name>
      <List>
        <For each={die().faces}>
          {(item, index) => {
            return (
              <Face>
                {item.value}
                <Roll roll={index} />
              </Face>
            );
          }}
        </For>
      </List>
    </Container>
  );
};
