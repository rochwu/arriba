import {vars} from '@arriba/css';
import styled from '@emotion/styled';

export const Shape = styled.div({
  display: 'grid',
  placeContent: 'center',
  width: vars.die.size,
  height: vars.die.size,
  borderRadius: vars.borderRadius,
  position: 'relative',
});
