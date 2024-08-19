import {Effects} from '../../../constants';
import {getDice} from '../../getDice';
import {getEffect} from '../../getEffect';
import {getValue} from '../../getValue';
import type {Score, State} from '../../types';

import {fire} from './instant/fire';
import {place} from './place';

const calculate = (score: Score[]): Score => {
  const beat = score.length / 2;

  const [won, lost] = score.reduce(
    (count, score) => {
      count[0] = score === 'win' ? count[0] + 1 : count[0];
      count[1] = score === 'lose' ? count[1] + 1 : count[1] + 0;

      return count;
    },
    [0, 0],
  );

  if (won >= beat) {
    return 'win';
  }

  return lost >= beat ? 'lose' : 'none';
};

export const turn = (state: State) => {
  const id = Effects.Geomentralist;

  {
    const effect = getEffect(state, id);
    const dice = getDice(state, id);

    const special = effect.special!;
    const turns = special.turns!;
    const score = special.score!;

    if (dice.length === 0) {
      turns.at = 0;

      return;
    }

    // Only reset on next round, so that users can see the results of the previous turn
    if (turns.at === 0) {
      score.forEach((_, index) => {
        score[index] = 'none';
      });
    }

    turns.at += 1;

    const us = getValue(state, ...dice);
    const them = getValue(state, ...special.opponents!);

    const tally = us >= them ? 'win' : 'lose';

    const index = score.indexOf('none');

    score[index] = tally;

    const result = calculate(score);

    if (result === 'win' || result === 'lose') {
      turns.at = 0;

      if (special.death && result === 'lose') {
        dice.forEach((die) => {
          fire(state, {die: die.id});
        });
      } else {
        dice.forEach((die) => place(state, {from: die.id}));
      }
    }
  }
};
