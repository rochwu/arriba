import {type Component} from 'solid-js';
import {styled} from 'solid-styled-components';

import {Game} from './Game';
import {store} from './store';

const Container = styled.div({
  margin: '1em',
});

export const App: Component = () => {
  return (
    <Container>
      <div>Turn {store.turns}</div>
      <Game />
    </Container>
  );
};
