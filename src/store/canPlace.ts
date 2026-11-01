import type {Die, Slot} from './types';

export const isUnlocked = (slots: Slot[]) => {
  const keyed = slots.filter((slot) => slot.key);

  return keyed.every((slot) => slot.die);
};

// Single source of truth for slot rules: the UI colors with it, the store enforces it
export const canPlace = ({
  die,
  slot,
  slots,
}: {
  die: Die;
  slot: Slot;
  slots: Slot[];
}) => {
  const {roll = 1, value} = slot.min ?? {};
  const unlocked = !slot.lock || isUnlocked(slots);

  return (
    die.roll >= roll &&
    (value === undefined || die.faces[die.roll].value >= value) &&
    unlocked
  );
};
