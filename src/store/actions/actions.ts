import {shuffle} from 'lodash-es';
import {produce} from 'solid-js/store';

import {DropType, Effects} from '../../constants';
import {setStore} from '../store';
import type {Die, DieId, EffectId} from '../types';

import {makeDie} from './makeDie';
import {makeFaces} from './makeFaces';
import {age} from './mutators/age';
import {summon} from './mutators/effects/summon';
import {place} from './mutators/place';
import {roll} from './mutators/roll';
import {swap} from './mutators/swap';

const beginners = [1, 1, 1, 2, 2, 3];

export const actions = {
  generate(repeat = 1) {
    const dice: Die[] = Array.from({length: repeat}).map(() => {
      return makeDie({age: 1, faces: makeFaces(shuffle(beginners))});
    });

    setStore(
      produce((state) => {
        dice.forEach((die) => {
          const id = die.id;

          state.dieById[id] = die;
          state.effectById[Effects.Unplaced].dice.push(id);
          state.dice.push(id);
        });
      }),
    );
  },
  endTurn() {
    setStore(
      produce((state) => {
        age(state);

        summon(state);

        // Has to be at the end or the rolls won't count right up top
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
          if (to.type === DropType.Die) {
            swap(state, {from: dieId, to: to.id!});
            return;
          }

          place(state, {
            from: dieId,
            to: to.id ?? Effects.Unplaced,
            order: to.order,
          });
        });
      }),
    );
  },
};
