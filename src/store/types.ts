export type DieId = string;
export type EffectId = string;

type Face = {
  id: number;
  value: number;
};

export type Die = {
  id: DieId;
  effect: EffectId;
  name: string;
  faces: Record<number, Face>;
  rolls: number[]; // eg: [1, 2, 3, 4, 5, 6], it's aware of how many faces there are
  roll: number; // value in `rolls` eg: 1 - 6
  age: number;
  opponent?: boolean;
};

export type Slot = {
  id: number;
  die?: DieId;
  min?: number;
  key?: boolean;
  lock?: boolean;
};

export type Effect = {
  id: EffectId;
  name: string;
  special?: {
    instant?: boolean;
    turned?: {
      turns: number;
      at: number;
    };
    opponents?: DieId[];
    death?: boolean;
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
