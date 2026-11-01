import {GlobalStyles, vars} from '@arriba/css';
import {Tooltip} from '@arriba/tooltip';
import styled from '@emotion/styled';

import {Game} from './Game';
import {useStore} from './store';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.gap,
  position: 'relative',
  margin: '1em',
});

export const App = () => {
  const turns = useStore((state) => state.turns);

  return (
    <>
      <GlobalStyles />
      <Container>
        <div>Turn {turns}</div>
        <Game />
        <Tooltip />
      </Container>
    </>
  );
};
