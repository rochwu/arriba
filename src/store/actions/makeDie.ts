import {merge, shuffle, uniqueId} from 'lodash-es';

import {Effects, Sides} from '@/constants';
import {names} from '@/names';
import type {Die} from '@/store/types';

import {makeFaces} from './makeFaces';
import {roll} from './roll';

export const makeDie = (args: Partial<Die> = {}) => {
  const base: Die = {
    age: 1,
  } as never;

  const partial = merge({}, base, args);

  // Finish up props that are dependent, these are order dependent

  // Cannot be added to `base` because it'd merge a 6 faces into eg: 5 faces from args
  partial.faces ??= makeFaces(shuffle(Sides));

  partial.id ??= uniqueId('d');

  partial.name ??= names.shift() ?? partial.id;

  partial.rolls ??= Object.keys(partial.faces).map(Number);

  partial.roll ??= roll(partial.rolls);

  partial.effect ??= partial.opponent ? Effects.None : Effects.Unplaced;

  return partial;
};
