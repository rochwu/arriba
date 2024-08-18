import {cloneDeep} from 'lodash-es';

export const repeat = <T>(times: number, thing: T) => {
  const things = [];

  for (let i = 0; i < times; i += 1) {
    things.push(cloneDeep(thing));
  }

  return things;
};
