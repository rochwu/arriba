import {shuffle} from 'lodash-es';

import {Effects} from '../constants';

import {makeDie} from './actions/makeDie';
import {makeFaces} from './actions/makeFaces';
import {makeEffect} from './makeEffect';
import {repeat} from './repeat';

export const geomentralistDie = makeDie({
  name: 'Geomentralist',
  age: 666,
  faces: makeFaces([undefined, 6, 6, 6, 6, 6]),
  // faces: makeFaces([undefined, 2, 2, 2, 2, 2]),
  opponent: true,
});

const beginners = [1, 1, 1, 2, 2, 3];

export const beginnerDice = [
  makeDie({
    faces: makeFaces(shuffle(beginners)),
  }),
  makeDie({
    faces: makeFaces(shuffle(beginners)),
  }),
  makeDie({
    faces: makeFaces(shuffle(beginners)),
  }),
];

const geometric = makeEffect({
  id: Effects.Geometric,
  name: 'Geomentral Ritual',
  description: 'In the name of patron saint geometry, deface a peer',
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
  description: 'Hold up, a die with 5 faces?!',
  slots: repeat(2, {}),
  special: {
    opponents: [geomentralistDie.id],
    turns: {
      max: 3,
      at: 0,
    },
    death: true,
  },
});

const summon = makeEffect({
  id: Effects.Summon,
  name: 'Summon',
  description: 'Get more! No one better than you is coming, though',
  slots: [{}],
});

const unplaced = makeEffect({
  id: Effects.Unplaced,
  name: 'Put These to Work',
  description: '', // Turns of descriptions on render
  slots: [
    ...beginnerDice.map((die) => ({die: die.id})),
    ...repeat(9 - beginnerDice.length, {}),
  ],
});

const fire = makeEffect({
  id: Effects.Fire,
  name: 'Fire',
  description: 'Die underperforming? Consider early retirement',
  special: {
    instant: true,
  },
  slots: [{}],
});

export const effects = {
  [geomentralistEffect.id]: geomentralistEffect,
  [geometric.id]: geometric,
  [fire.id]: fire,
  [summon.id]: summon,
  [unplaced.id]: unplaced,
};
