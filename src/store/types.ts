export type DieId = string;
export type EffectId = string;

type List<T> = (T | null)[]; // undefined doesn't seem to work

type Face = {
  weight: number;
  value: number;
};

export type Die = {
  id: DieId;
  effect: EffectId;
  name: string;
  faces: Face[];
  roll: number;
  age: number;
};
export type Effect = {
  id: EffectId;
  dice: List<DieId>;
  name: string;
  max: number;
  instant: boolean;
};

export type State = {
  dieById: Record<DieId, Die>;
  effectById: Record<EffectId, Effect>;
  effects: EffectId[];
  turns: number;
  returning: DieId[];
};
