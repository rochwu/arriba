import {type Component} from 'solid-js';
import {styled} from 'solid-styled-components';

import {GlobalStyles, vars} from '@arriba/css';
import {Tooltip} from '@arriba/tooltip';

import {Game} from './Game';
import {store} from './store';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.gap,
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
