import {random} from 'lodash-es';

import {State} from '../../types';
import {createDie} from '../createDie';

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

  const summoned = createDie({values});
  state.dieById[summoned.id] = summoned;
  const index = state.unplaced.indexOf(null);
  if (index !== -1) {
    state.unplaced[index] = summoned.id;
  } else {
    state.unplaced.push(summoned.id);
  }

  place(state, {from: summoner.id});
};
