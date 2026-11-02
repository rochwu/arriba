// biome-ignore-all lint/suspicious/noExplicitAny: generic over arbitrary token trees
// biome-ignore-all lint/complexity/noBannedTypes: `{}` means no composed styles

// `& {}` stops `'8px' | string` from collapsing into `string`, the namespace is just so hovers read `'8px' | Css.String`
namespace Var {
  export type String = string & {};
  export type Number = number & {};
}

// Hover shows the original literal, while still letting any value be assigned
type Assignable<Node> = Node extends string
  ? Node | Var.String
  : Node extends number
    ? Node | Var.Number
    : {-readonly [Prop in keyof Node]: Assignable<Node[Prop]>};

export const createCssVars = <
  const Styles extends Record<string, any>,
  const MoreStyles extends Record<string, any> | {},
>(
  styles: Styles,
  /**
   * Let us compose styles based on previously defined CSS variables
   */
  composer?: (styles: Styles) => MoreStyles,
) => {
  // Record of CSS variable and initial value, spread this at :root to register
  const root: Record<string, string> = {};

  const proxify = <Node extends Record<string, any>>(node: Node, path = '') => {
    const proxies: Record<keyof Node, Node[string]> = {} as never;

    const getName = (prop: string) => {
      return path ? `${path}-${prop}` : prop;
    };

    for (const prop in node) {
      const value = node[prop];

      const newPath = getName(prop);

      if (typeof value === 'object') {
        proxies[prop] = proxify(value, newPath);
      } else {
        root[`--${newPath}`] = value;
      }
    }

    return new Proxy<Node>(node, {
      // Gets a variable function call instead of the contents in it
      // Could do another version that returns the contents of it. Maybe return var and val
      get(target, prop: string) {
        if (typeof target[prop] === 'object') {
          return proxies[prop];
        }

        return `var(--${getName(prop)})`;
      },
      // Sets the value of the CSS variable for super easy app wide changes
      set(target, prop: string, newValue: any) {
        if (typeof target[prop] === 'object') {
          // Disallow setting when it returns object
          return false;
        }

        document.documentElement.style.setProperty(
          `--${getName(prop)}`,
          newValue,
        );
        Reflect.set(node, prop, newValue);
        return true;
      },
    });
  };

  const styled = proxify(styles);

  const vars = {...(composer ? {...proxify(composer(styled))} : {}), ...styled};

  return {
    vars: vars as Assignable<
      typeof composer extends undefined ? Styles : Styles & MoreStyles
    >,
    root,
  };
};
