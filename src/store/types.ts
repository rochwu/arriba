import type {ReactNode} from 'react';

export type DieId = string;
export type EffectId = string;

type Face = {
  id: number;
  value: number; // what that face is worth
};

export type Die = {
  id: DieId;
  effect: EffectId;
  name: string;
  faces: Record<number, Face>;
  rolls: number[]; // eg: [1, 2, 3, 4, 5, 6], it's aware of how many faces there are
  roll: number; // which face landed, eg: 1 - 6
  age: number;
  opponent?: boolean;
};

export type Slot = {
  id: number;
  die?: DieId;
  min?: {
    roll?: number; // which face landed, eg: 1 - 6
    value?: number; // what that face is worth
  };
  key?: boolean;
  lock?: boolean;
};

export type Score = 'win' | 'lose' | 'none';

export type Effect = {
  id: EffectId;
  name: string;
  description?: ReactNode;
  special?: {
    instant?: boolean;
    opponents?: DieId[];
    death?: boolean;
    score?: Score[]; // tie = undefined
    turns?: {
      max: number;
      at: number;
    };
  };
  slots: Slot[];
};

export type State = {
  dieById: Record<DieId, Die>;
  dice: DieId[];
  effectById: Record<EffectId, Effect>;
  effects: EffectId[];
  turns: number;
  returning: DieId[];
};
