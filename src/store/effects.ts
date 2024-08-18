import {shuffle} from 'lodash-es';

import {Effects} from '../constants';

import {makeDie} from './actions/makeDie';
import {makeFaces} from './actions/makeFaces';
import {makeEffect} from './makeEffect';
import {repeat} from './repeat';
import type {Die} from './types';

export const opponents: Die[] = [
  {...makeDie(), age: 13, opponent: true},
  {...makeDie(), age: 17, opponent: true},
];

export const geomentralistDie = makeDie({
  name: 'Geomentralist',
  age: 666,
  faces: makeFaces([undefined, 6, 6, 6, 6, 6]),
  opponent: true,
});

const beginners = [1, 1, 1, 2, 2, 3];

export const beginnerDie = makeDie({
  faces: makeFaces(shuffle(beginners)),
});

const geometric = makeEffect({
  id: Effects.Geometric,
  name: 'Geometric Ritual',
  slots: [
    {
      min: 6,
      key: true,
    },
    {
      min: 6,
      key: true,
    },
    {
      min: 1,
      lock: true,
    },
  ],
});

const geomentralistEffect = makeEffect({
  id: Effects.Geomentralist,
  name: 'Deranged Geomentralist',
  slots: repeat(2, {}),
  special: {
    opponents: [geomentralistDie.id],
  },
  //     special: {
  //       turned: {
  //         turns: 3,
  //         at: 0,
  //       },
  //       death: true,
  //     },
});

const summon = makeEffect({
  id: Effects.Summon,
  name: 'Summon',
  slots: [{}],
});

const unplaced = makeEffect({
  id: Effects.Unplaced,
  name: 'Put These to Work',
  slots: [
    {
      die: beginnerDie.id,
    },
    ...repeat(8, {}),
  ],
});

const fire = makeEffect({
  id: Effects.Fire,
  name: 'Fire',
  special: {
    instant: true,
  },
  slots: [{}],
});

export const effects = {
  // ...create(
  //   {
  //     id: Effects.Duel,
  //     name: 'Duel to the Death',
  //     special: {
  //       death: true,
  //       turned: {
  //         turns: 3,
  //         at: 0,
  //       },
  //       opponents: opponents.map(({id}) => id),
  //     },
  //   },
  //   {
  //     id: Effects.Geomentralist,
  //     name: 'Deranged Geomentralist',
  //     special: {
  //       turned: {
  //         turns: 3,
  //         at: 0,
  //       },
  //       death: true,
  //       opponents: [geomentralist.id],
  //     },
  //   },
  //   {id: Effects.Unplaced, name: 'Put These to Work'},
  //   {
  //     id: Effects.Fire,
  //     name: 'Fire',
  //     special: {
  //       instant: true,
  //     },
  //   },
  // ),
  [geomentralistEffect.id]: geomentralistEffect,
  [geometric.id]: geometric,
  [fire.id]: fire,
  [summon.id]: summon,
  [unplaced.id]: unplaced,
};
