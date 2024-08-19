import {LockLaminated} from 'phosphor-solid-js';
import {createMemo, Show, type Component} from 'solid-js';

import {useEffectContext} from '../Provider';

import {Icon} from './Icon';
import {isUnlocked} from './isUnlocked';

export const Lock: Component = () => {
  const effect = useEffectContext();

  const unlocked = createMemo(() => isUnlocked(effect.slots));

  return (
    <Show when={!unlocked()}>
      <Icon Icon={LockLaminated} tooltip="locked" />
    </Show>
  );
};
