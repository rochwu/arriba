import {Effects} from '@/constants';

import {getSlot} from './getSlot';
import {isUnlocked} from './isUnlocked';
import type {Destination, Die, DieId, Slot, State} from './types';

const fits = ({die, slot, slots}: {die: Die; slot: Slot; slots: Slot[]}) => {
  const {roll = 1, value} = slot.min ?? {};
  const unlocked = !slot.lock || isUnlocked(slots);

  return (
    die.roll >= roll &&
    (value === undefined || die.faces[die.roll].value >= value) &&
    unlocked
  );
};

// Single source of truth for putting down: the UI colors with it, the store enforces it
export const canPutDown = (
  state: State,
  {die: id, to}: {die: DieId; to: Destination},
): 'allowed' | 'same' | 'full' | 'blocked' => {
  const die = state.dieById[id];

  if (to.type === 'die') {
    const other = state.dieById[to.id!];

    if (other.id === die.id) {
      return 'same';
    }

    const fromSlot = getSlot(state, {effect: die.effect, die: die.id})!;
    const toSlot = getSlot(state, {effect: other.effect, die: other.id})!;

    // Each die has to fit the other's slot
    const swappable =
      fits({
        die,
        slot: toSlot,
        slots: state.effectById[other.effect].slots,
      }) &&
      fits({
        die: other,
        slot: fromSlot,
        slots: state.effectById[die.effect].slots,
      });

    return swappable ? 'allowed' : 'blocked';
  }

  const effect = to.id ?? Effects.Unplaced;
  const slots = state.effectById[effect].slots;

  if (die.effect === effect && to.order === undefined) {
    return 'same';
  }

  const slot =
    to.order === undefined
      ? getSlot(state, {effect, die: undefined})
      : slots[to.order];

  if (!slot || slot.die) {
    return 'full';
  }

  return fits({die, slot, slots}) ? 'allowed' : 'blocked';
};
