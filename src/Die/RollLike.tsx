import {styled} from 'solid-styled-components';

import {vars} from '@arriba/css';

import {Absolute} from '../Absolute';

export const RollLike = styled(Absolute)({
  left: '-1px',
  top: '-1px',
  width: vars.die.roll.size,
  height: vars.die.roll.size,
  borderRadius: `50%`,
});
