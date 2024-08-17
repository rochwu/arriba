import {styled} from 'solid-styled-components';

import {vars} from '../css';

export const Shape = styled.div({
  display: 'grid',
  placeContent: 'center',
  width: vars.die.size,
  aspectRatio: '1 / 1',
  borderRadius: '0.5em',
  position: 'relative',
});
