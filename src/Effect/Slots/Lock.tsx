import {LockLaminatedIcon} from '@phosphor-icons/react';
import {useEffectContext} from '@/Effect/Provider';
import {isUnlocked} from '@/store';

import {Icon} from './Icon';

export const Lock = () => {
  const effect = useEffectContext();

  if (isUnlocked(effect.slots)) {
    return null;
  }

  return <Icon Icon={LockLaminatedIcon} tooltip="locked" />;
};
