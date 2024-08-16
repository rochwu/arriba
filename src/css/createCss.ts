export const createCss = <Styles extends Record<string, any>>(
  styles: Styles,
) => {
  // Record of CSS variable and initial value, spread this at :root to register
  const record: Record<string, string> = {};

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
        record[`--${newPath}`] = value;
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

        document.documentElement.style.setProperty(getName(prop), newValue);
        Reflect.set(node, prop, newValue);
        return true;
      },
    });
  };

  const vars = proxify(styles);

  return {vars, record};
};
