import {createGlobalStyles} from 'solid-styled-components';

import 'normalize.css';
import {vars, record} from './css';

export const GlobalStyles = createGlobalStyles({
  ':root': record,
  body: {
    backgroundColor: vars.backgroundColor,
    color: vars.color,
    fontFamily: vars.fontFamily,
    userSelect: 'none',
  },
});
