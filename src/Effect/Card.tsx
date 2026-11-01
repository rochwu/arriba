import {vars} from '@arriba/css';
import styled from '@emotion/styled';

export const Card = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.gap,
  border: '1px dashed black',
  padding: vars.gap,
  borderRadius: vars.borderRadius,
});
