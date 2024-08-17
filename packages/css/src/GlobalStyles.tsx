import {createGlobalStyles} from 'solid-styled-components';

import 'normalize.css';
import {vars, root} from './css';

export const GlobalStyles = createGlobalStyles({
  ':root': root,
  body: {
    backgroundColor: vars.backgroundColor,
    color: vars.color,
    fontFamily: vars.fontFamily,
    userSelect: 'none',
  },
});
