import {random} from 'lodash-es';
import {produce} from 'solid-js/store';

import {EFFECTS} from '../../constants';
import {setStore} from '../store';
import type {Die, DieId, EffectId} from '../types';

import {createDie} from './createDie';
import {age} from './mutators/age';
import {summon} from './mutators/effects/summon';
import {place} from './mutators/place';
import {roll} from './mutators/roll';
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
          state.effectById[EFFECTS.UNPLACED].dice.push(id);
        });
      }),
    );
  },
  endTurn() {
    setStore(
      produce((state) => {
        age(state);

        summon(state);

        // Has to be at the end or the rolls won't count right
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

          place(state, {
            from: dieId,
            to: to.id ?? EFFECTS.UNPLACED,
            order: to.order,
          });
        });
      }),
    );
  },
};
