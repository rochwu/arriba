export const createCss = <T extends Record<string, any>>(config: T) => {
  const record: Record<string, string> = {};

  const proxify = <U extends Record<string, any>>(obj: U, path = ''): U => {
    return new Proxy(obj, {
      get(target, prop: string | symbol) {
        if (
          typeof prop === 'symbol' ||
          prop === 'inspect' ||
          prop === 'toStringTag'
        ) {
          return Reflect.get(target, prop);
        }

        const newPath = path ? `${path}-${String(prop)}` : String(prop);

        if (
          typeof target[prop as keyof U] === 'object' &&
          target[prop as keyof U] !== null
        ) {
          return proxify(target[prop as keyof U], newPath);
        } else {
          const name = `--${newPath}`;
          record[name] = target[prop as keyof U] as string;

          return `var(${name})`;
        }
      },
      set(target, prop: string | symbol, value: any) {
        if (typeof prop === 'symbol') return false;

        const newPath = path ? `${path}-${String(prop)}` : String(prop);
        const name = `--${newPath}`;

        // Update the CSS variable value in the DOM
        document.documentElement.style.setProperty(name, value);
        target[prop as keyof U] = value;
        return true;
      },
    }) as U;
  };

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

  traverse(config);
  const vars = proxify(config);
  return {vars, record};
};
