export type DieId = string;
export type EffectId = string;

type List<T> = (T | undefined)[]; // undefined doesn't seem to work

type Face = {
  weight: number;
  value: number;
};

export type Die = {
  id: DieId;
  effect?: EffectId;
  name: string;
  faces: Face[];
  face: number;
};
export type Effect = {id: EffectId; dice: List<DieId>};

export type State = {
  dieById: Record<DieId, Die>;
  effectById: Record<EffectId, Effect>;
  effects: EffectId[];
  unplaced: List<DieId>;
};
