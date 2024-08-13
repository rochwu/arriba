import {random} from 'lodash-es';

import {UNPLACED} from '../../../constants';
import {State} from '../../types';
import {createDie} from '../createDie';
import {getDice} from '../getDice';

import {place} from './place';

const it = Array.from({length: 6});

export const summon = (state: State) => {
  const effect = state.effectById['summon'];

  const summoner = state.dieById[effect.dice[0]!];

  if (!summoner) {
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

  const summoned = createDie({values});
  state.dieById[summoned.id] = summoned;

  const unplaced = getDice(state, {effect: UNPLACED});

  const index = unplaced.indexOf(null);
  if (index !== -1) {
    unplaced[index] = summoned.id;
  } else {
    unplaced.push(summoned.id);
  }
};
