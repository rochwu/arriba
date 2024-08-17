import {styled} from 'solid-styled-components';

import {vars} from '@arriba/css';

export const Shape = styled.div({
  display: 'grid',
  placeContent: 'center',
  width: vars.die.size,
  height: vars.die.size,
  borderRadius: vars.borderRadius,
  position: 'relative',
});
