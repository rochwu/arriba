import {type Component} from 'solid-js';
import {styled} from 'solid-styled-components';

import {GlobalStyles} from './css';
import {Game} from './Game';
import {store} from './store';
import {Tooltip} from './tooltip';

const Container = styled.div({
  position: 'relative',
  margin: '1em',
});

export const App: Component = () => {
  return (
    <>
      <GlobalStyles />
      <Container>
        <div>Turn {store.turns}</div>
        <Game />
        <Tooltip />
      </Container>
    </>
  );
};
