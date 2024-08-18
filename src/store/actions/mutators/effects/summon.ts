import {random} from 'lodash-es';

import {Effects} from '../../../../constants';
import {getDice} from '../../../getDice';
import type {State} from '../../../types';
import {makeDie} from '../../makeDie';
import {makeFaces} from '../../makeFaces';
import {place} from '../place';
import {push} from '../push';

const it = Array.from({length: 6});

export const summon = (state: State) => {
  const [summoner] = getDice(state, Effects.Summon);

  if (!summoner) {
    return;
  }

  // TODO: Do it in UI too
  if (state.dice.length === state.effectById[Effects.Unplaced].slots.length) {
    place(state, {from: summoner.id});
    return;
  }

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

  const summoned = makeDie({faces: makeFaces(values)});
  // TODO: Create a born mutator that puts it in the right place
  state.dieById[summoned.id] = summoned;
  state.dice.push(summoned.id);

  push(state, {die: summoned.id, effect: Effects.Unplaced});
};
