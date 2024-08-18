import {mean, random, shuffle} from 'lodash-es';

import {Effects} from '../../../../constants';
import {getDice} from '../../../getDice';
import type {Die, State} from '../../../types';
import {makeDie} from '../../makeDie';
import {makeFaces} from '../../makeFaces';
import {place} from '../place';
import {push} from '../push';

const it = Array.from({length: 6});

const getValues = (die: Die) => {
  return die.rolls.map((roll) => die.faces[roll].value);
};

// Mutates, change to not if not using shuffle
const spread = (values: number[]) => {
  const next = [...values];

  // Deal with die without all 6 faces.
  if (next.length < 5) {
    const average = Math.round(mean(next));

    while (next.length < 5) {
      next.push(average);
    }
  }

  const removable = next.reduce((removable, value, index) => {
    if (value > 1) {
      return [...removable, index];
    }

    return removable;
  }, [] as number[]);

  removable.forEach((removable) => {
    next[removable] -= 1;
  });

  removable.forEach(() => {
    next[random(0, 5)] += 1;
  });

  // Shuffle at the end to not just always remove from the front
  return shuffle(next);
};

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

  const values = spread(getValues(summoner));

  place(state, {from: summoner.id});

  const summoned = makeDie({faces: makeFaces(values)});
  // TODO: Create a born mutator that puts it in the right place
  state.dieById[summoned.id] = summoned;
  state.dice.push(summoned.id);

  push(state, {die: summoned.id, effect: Effects.Unplaced});
};
