import {vars} from '@arriba/css';
import type {Icon, IconProps} from '@phosphor-icons/react';
import type {ReactNode} from 'react';

import {Flex} from './Flex';

const base = {
  style: {
    width: vars.slot.special.size,
    height: vars.slot.special.size,
  },
  weight: 'duotone',
  color: vars.slot.special.color,
} as const;

export const Iconed = ({
  Icon,
  children,
  ...rest
}: {Icon: Icon; children?: ReactNode} & IconProps) => {
  const icon = <Icon {...base} {...rest} />;

  if (!children) {
    return icon;
  }

  return (
    <Flex>
      {icon}
      &nbsp;
      {children}
    </Flex>
  );
};
