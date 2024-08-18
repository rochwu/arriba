import {LockLaminated} from 'phosphor-solid-js';
import {createMemo, Show, type Component} from 'solid-js';

import type {Effect} from '../../store';

import {Special} from './Special';

export const Lock: Component<{effect: Effect}> = (props) => {
  const unlocked = createMemo(() => {
    const keyed = props.effect.slots.filter((slot) => slot.key);

    return keyed.every((slot) => slot.die);
  });

  return (
    <Show when={!unlocked()}>
      <Special Icon={LockLaminated} tooltip="locked" />
    </Show>
  );
};
