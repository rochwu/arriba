import {canPutDown} from '@/store/canPutDown';
import {store} from '@/store/store';
import type {Destination, DieId} from '@/store/types';

import {age} from './mutators/age';
import {summon} from './mutators/effects/summon';
import {instant} from './mutators/instant';
import {place} from './mutators/place';
import {roll} from './mutators/roll';
import {swap} from './mutators/swap';
import {turn} from './mutators/turn';

/**
 * The entry point for the UI to interact with the store
 */
export const actions = {
  pickUp({id}: {id: DieId}) {
    store.setState((state) => {
      state.picked = id;
    });
  },
  putDown({to}: {to: Destination}) {
    store.setState((state) => {
      const die = state.picked;
      state.picked = undefined;

      if (!die || canPutDown(state, {die, to}) !== 'allowed') {
        return;
      }

      let landed: DieId[];

      if (to.type === 'die') {
        swap(state, {from: die, to: to.id!});
        landed = [die, to.id!];
      } else {
        place(state, {from: die, to: to.id, order: to.order});
        landed = [die];
      }

      // Effects react once the dice are where they landed
      landed.forEach((id) => {
        instant(state, {die: id});
      });
    });
  },
  cancel() {
    store.setState((state) => {
      state.picked = undefined;
    });
  },
  endTurn() {
    store.setState((state) => {
      state.picked = undefined;

      age(state);

      summon(state);

      // Has to be at the end or the rolls won't count right up top
      roll(state);

      // Happens after the rolls to have an immediate result
      turn(state);
    });
  },
};
