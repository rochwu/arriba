import {random} from 'lodash-es';

import {Effects} from '../../../../constants';
import type {State} from '../../../types';
import {makeDie} from '../../makeDie';
import {tryEffect} from '../../tryEffect';
import {place} from '../place';
import {push} from '../push';

const it = Array.from({length: 6});

export const summon = (state: State) => {
  const maybe = tryEffect(state, Effects.Summon);

  if (!maybe) {
    return;
  }

  const {
    dice: [summoner],
  } = maybe;

  const {roll} = summoner;

  let values: number[];

  // Least to most powerful
  if (roll <= 1) {
    values = it.map(() => random(1, 3));
  } else if (roll <= 3) {
    values = it.map(() => random(1, 5));
  } else {
    values = it.map(() => random(2, 6));
  }

  place(state, {from: summoner.id});

  const summoned = makeDie({values});
  // TODO: Create a born mutator that puts it in the right place
  state.dieById[summoned.id] = summoned;
  state.dice.push(summoned.id);

  push(state, {die: summoned.id, effect: Effects.Unplaced});
};
