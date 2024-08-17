import {splitProps, type Component, type JSX} from 'solid-js';
import type {DefaultTheme} from 'solid-styled-components';
import {ThemeProvider} from 'solid-styled-components';

// import original module declarations
import 'solid-styled-components';

// and extend them!
declare module 'solid-styled-components' {
  export interface DefaultTheme {
    color?: string;
    backgroundColor?: string;
  }
}

export const color = (
  {theme = {}}: {theme?: DefaultTheme},
  {color, backgroundColor}: {color?: string; backgroundColor?: string},
) => {
  return {
    color: theme.color ?? color,
    backgroundColor: theme.backgroundColor ?? backgroundColor,
  };
};

export const Color: Component<{
  children: JSX.Element;
  color?: string;
  backgroundColor?: string;
}> = (props) => {
  const [theme] = splitProps(props, ['color', 'backgroundColor']);

  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};
