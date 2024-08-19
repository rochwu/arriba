import {produce} from 'solid-js/store';

import {DropType, Effects} from '../../constants';
import {setStore} from '../store';
import type {DieId, EffectId} from '../types';

import {age} from './mutators/age';
import {summon} from './mutators/effects/summon';
import {place} from './mutators/place';
import {roll} from './mutators/roll';
import {swap} from './mutators/swap';
import {turn} from './mutators/turn';

export const actions = {
  endTurn() {
    setStore(
      produce((state) => {
        age(state);

        summon(state);

        // Has to be at the end or the rolls won't count right up top
        roll(state);

        // Happens after the rolls to have an immediate result
        turn(state);
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
