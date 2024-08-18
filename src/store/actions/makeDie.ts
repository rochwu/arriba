import {merge, shuffle, uniqueId} from 'lodash-es';

import {Effects} from '../../constants';
import {names} from '../../names';
import type {Die} from '../types';

import {makeFaces} from './makeFaces';
import {roll} from './roll';

const generic = [1, 2, 3, 4, 5, 6];

export const makeDie = (args: Partial<Die> = {}) => {
  const base: Die = {
    age: 1,
  } as never;

  const partial = merge({}, base, args);

  // Finish up props that are dependent, these are order dependent

  // Cannot be added to `base` because it'd merge a 6 faces into eg: 5 faces from args
  partial.faces ??= makeFaces(shuffle(generic));

  partial.id ??= uniqueId('d');

  partial.name ??= names.shift() ?? partial.id;

  partial.rolls ??= Object.keys(partial.faces) as unknown as number[]; // faces is Record<number, ...

  partial.roll ??= roll(partial.rolls);

  partial.effect ??= partial.opponent ? Effects.None : Effects.Unplaced;

  return partial;
};
