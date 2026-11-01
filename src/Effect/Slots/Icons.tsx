import styled from '@emotion/styled';
import {
  KeyIcon,
  LightningIcon,
  SkullIcon,
  StairsIcon,
} from '@phosphor-icons/react';

import {Absolute} from '@/Absolute';
import type {Effect, Slot} from '@/store';

import {Icon} from './Icon';
import {Lock} from './Lock';

const Position = styled(Absolute)({
  bottom: '-4px',
  minWidth: '100%',
});

export const Icons = ({effect, slot}: {effect: Effect; slot?: Slot}) => {
  const {instant, death, turns, key, lock} = {...effect.special, ...slot};

  return (
    <Position>
      {instant && <Icon Icon={LightningIcon} tooltip="happens instantly" />}
      {death && <Icon Icon={SkullIcon} tooltip="die loses, die dies" />}
      {turns && <Icon Icon={StairsIcon} tooltip="busy 'til it's over" />}
      {key && <Icon Icon={KeyIcon} tooltip="unlocks" />}
      {lock && <Lock />}
    </Position>
  );
};
