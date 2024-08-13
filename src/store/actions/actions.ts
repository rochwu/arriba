import {random, uniqueId} from 'lodash-es';
import {produce} from 'solid-js/store';

import {names} from '../../names';
import {setStore} from '../store';
import {Die, DieId, EffectId} from '../types';

import {place} from './mutators/place';
import {roll} from './mutators/roll';
import {summon} from './mutators/summon';
import {swap} from './mutators/swap';

export const actions = {
  generate(repeat = 1) {
    const dice: Die[] = Array.from({length: repeat}).map(() => {
      const id = uniqueId('d');

      return {
        id,
        name: names.shift() ?? id,
        roll: random(0, 5),
        faces: Array.from({length: 6}).map(() => ({
          value: random(1, 4),
          weight: 1,
        })),
      };
    });

    setStore(
      produce((state) => {
        dice.forEach((die) => {
          const id = die.id;

          state.dieById[id] = die;
          state.unplaced.push(id);
        });
      }),
    );
  },
  endTurn() {
    setStore(
      produce((state) => {
        summon(state);

        // End
        state.turns += 1;
        roll(state);
      }),
    );
  },
  place(
    ...placements: {
      dieId: DieId;
      to: {
        id?: DieId | EffectId;
        type?: string;
        order?: number;
      };
    }[]
  ) {
    setStore(
      produce((state) => {
        placements.forEach(({dieId, to}) => {
          if (to.type === 'die') {
            swap(state, {from: dieId, to: to.id!});
            return;
          }

          place(state, {from: dieId, to: to.id});
        });
      }),
    );
  },
};
