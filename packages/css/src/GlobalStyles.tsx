import {createGlobalStyles} from 'solid-styled-components';

import 'normalize.css';
import {vars, record} from './css';

export const GlobalStyles = createGlobalStyles({
  ':root': record,
  body: {
    userSelect: 'none',
    backgroundColor: vars.backgroundColor,
    fontFamily: vars.fontFamily,
  },
});
