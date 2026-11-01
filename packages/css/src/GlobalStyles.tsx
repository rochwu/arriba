import {Global} from '@emotion/react';

import 'normalize.css';
import {root, vars} from './css';

export const GlobalStyles = () => (
  <Global
    styles={{
      ':root': root,
      body: {
        backgroundColor: vars.backgroundColor,
        color: vars.color,
        fontFamily: vars.fontFamily,
        userSelect: 'none',
      },
    }}
  />
);
