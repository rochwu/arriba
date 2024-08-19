import {Effects} from '../../../constants';
import {getDice} from '../../getDice';
import {getEffect} from '../../getEffect';
import {getValue} from '../../getValue';
import type {Score, State} from '../../types';

const won = (score: Score[]) => {
  const beat = score.length / 2;
  const count = score.filter((value) => value === 'win').length;

  return count >= beat;
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
      score.forEach((_, index) => {
        score[index] = 'none';
      });

      return;
    }

    const us = getValue(state, ...dice);
    const them = getValue(state, ...special.opponents!);

    const tally = us >= them ? 'win' : 'lose';

    const index = score.indexOf('none');

    score[index] = tally;

    // console.log(won(score));

    turns.at += 1;
  }
};
