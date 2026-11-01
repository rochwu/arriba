import type {Theme} from '@emotion/react';
import {ThemeProvider} from '@emotion/react';
import type {ReactNode} from 'react';

declare module '@emotion/react' {
  export interface Theme {
    color?: string;
    backgroundColor?: string;
  }
}

export const color = (
  {theme = {}}: {theme?: Theme},
  {color, backgroundColor}: {color?: string; backgroundColor?: string},
) => {
  return {
    color: theme.color ?? color,
    backgroundColor: theme.backgroundColor ?? backgroundColor,
  };
};

export const Color = ({
  children,
  color,
  backgroundColor,
}: {
  children: ReactNode;
  color?: string;
  backgroundColor?: string;
}) => {
  return (
    <ThemeProvider theme={{color, backgroundColor}}>{children}</ThemeProvider>
  );
};
