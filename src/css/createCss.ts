export const createCss = <T extends Record<string, any>>(styles: T) => {
  const proxify = <U extends Record<string, any>>(obj: U, path = ''): U => {
    return new Proxy(obj, {
      get(target, prop: string) {
        const newPath = path ? `${path}-${prop}` : prop;

        if (
          typeof target[prop as keyof U] === 'object' &&
          target[prop as keyof U] !== null
        ) {
          return proxify(target[prop as keyof U], newPath);
        } else {
          const name = `--${newPath}`;

          return `var(${name})`;
        }
      },
      set(target, prop: string, value: any) {
        if (typeof prop === 'symbol') return false;

        const newPath = path ? `${path}-${prop}` : prop;
        const name = `--${newPath}`;

        // Update the CSS variable value in the DOM
        document.documentElement.style.setProperty(name, value);
        target[prop as keyof U] = value;
        return true;
      },
    }) as U;
  };

  const record: Record<string, string> = {};

  const traverse = (obj: Record<string, any>, path = '') => {
    for (const key in obj) {
      const newPath = path ? `${path}-${key}` : key;
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        traverse(obj[key], newPath);
      } else {
        const name = `--${newPath}`;
        record[name] = obj[key];
      }
    }
  };

  traverse(styles);

  const vars = proxify(styles);

  return {vars, record};
};
