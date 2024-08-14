import {random} from 'lodash-es';

import {EFFECTS} from '../../../../constants';
import type {State} from '../../../types';
import {createDie} from '../../createDie';
import {tryEffect} from '../../tryEffect';
import {place} from '../place';
import {push} from '../push';

const it = Array.from({length: 6});

export const summon = (state: State) => {
  const maybe = tryEffect(state, EFFECTS.SUMMON);

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

  const summoned = createDie({values});
  state.dieById[summoned.id] = summoned;

  push(state, {die: summoned.id, effect: EFFECTS.UNPLACED});
};
