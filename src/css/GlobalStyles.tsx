import {createGlobalStyles} from 'solid-styled-components';

import 'normalize.css';
import {vars, record} from './css';

export const GlobalStyles = createGlobalStyles({
  ':root': record,
  body: {
    user: 'none',
    backgroundColor: vars.app.backgroundColor,
    fontFamily: 'Arial, Helvetica, sans-serif',
  },
});
