import {createStore, produce} from 'solid-js/store';
import {uniqueId} from 'lodash-es';
import {Die, DieId, EffectId, State} from './types';
import {effects} from './effects';
import {swap} from './swap';
import {getDice} from './getDice';
import {random} from '../random';
import {names} from '../names';

export const [store, setStore] = createStore<State>({
  dieById: {},
  effectById: {
    ...effects,
  },
  effects: Object.keys(effects),
  unplaced: [],
});

export const actions = {
  generate(repeat = 1) {
    const dice: Die[] = Array.from({length: repeat}).map(() => {
      const id = uniqueId('d');

      return {
        id,
        name: names.shift() ?? 'Nada',
        face: random(0, 5),
        faces: Array.from({length: 6}).map(() => ({
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
      'dieById',
      produce((state) => {
        Object.values(state).forEach((die) => {
          die.face = random(0, 5);
        });
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
            swap(state, {to: to.id!, from: dieId});
            return;
          }

          const previousEffectId = state.dieById[dieId].effect;
          const effectId = to.id;

          if (previousEffectId === effectId) {
            return;
          }

          {
            const dice = getDice(state, {effect: previousEffectId});
            const index = dice.indexOf(dieId);
            dice[index] = undefined;
          }

          {
            const dice = getDice(state, {effect: effectId});
            const open = dice.findIndex((value) => value === undefined);

            if (open !== -1) {
              dice[open] = dieId;
            } else {
              dice.push(dieId);
            }
          }

          state.dieById[dieId].effect = effectId;
        });
      }),
    );
  },
};
