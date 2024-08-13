import {random} from 'lodash-es';
import {produce} from 'solid-js/store';

import {UNPLACED} from '../../constants';
import {setStore} from '../store';
import {Die, DieId, EffectId} from '../types';

import {createDie} from './createDie';
import {age} from './mutators/age';
import {place} from './mutators/place';
import {roll} from './mutators/roll';
import {summon} from './mutators/summon';
import {swap} from './mutators/swap';

const it = Array.from({length: 6});

export const actions = {
  generate(repeat = 1) {
    const dice: Die[] = Array.from({length: repeat}).map(() => {
      return createDie({age: 1, values: it.map(() => random(1, 4))});
    });

    setStore(
      produce((state) => {
        dice.forEach((die) => {
          const id = die.id;

          state.dieById[id] = die;
          state.effectById[UNPLACED].dice.push(id);
        });
      }),
    );
  },
  endTurn() {
    setStore(
      produce((state) => {
        age(state);

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

          place(state, {from: dieId, to: to.id ?? UNPLACED, order: to.order});
        });
      }),
    );
  },
};
