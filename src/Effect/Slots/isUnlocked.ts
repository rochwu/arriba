import type {Slot} from '../../store';

export const isUnlocked = (slots: Slot[]) => {
  const keyed = slots.filter((slot) => slot.key);

  return keyed.every((slot) => slot.die);
};
