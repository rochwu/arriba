import {type Component} from 'solid-js';
import {createGlobalStyles, styled} from 'solid-styled-components';

import {SolidDnd} from './SolidDnd';

const Container = styled.div({
  margin: '1em',
});

const Styles = createGlobalStyles({
  body: {
    userSelect: 'none',
    fontFamily: 'Arial, sans-sarif',
    backgroundColor: '#deb887',
  },
});

export const App: Component = () => {
  return (
    <>
      <Styles />
      <Container>
        <SolidDnd />
      </Container>
    </>
  );
};
