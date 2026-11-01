import {LockLaminatedIcon} from '@phosphor-icons/react';

import {useEffectContext} from '../Provider';

import {Icon} from './Icon';
import {isUnlocked} from './isUnlocked';

export const Lock = () => {
  const effect = useEffectContext();

  if (isUnlocked(effect.slots)) {
    return null;
  }

  return <Icon Icon={LockLaminatedIcon} tooltip="locked" />;
};
