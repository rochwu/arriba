import {styled} from 'solid-styled-components';

import {vars} from '@arriba/css';

export const Card = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.gap,
  border: '1px dashed black',
  padding: vars.gap,
  borderRadius: vars.borderRadius,
});
