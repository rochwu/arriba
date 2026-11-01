import {useTooltip} from '@arriba/tooltip';
import styled from '@emotion/styled';
import type {Icon as PhosphorIcon} from '@phosphor-icons/react';
import type {ReactNode} from 'react';

import {Iconed} from '../../Iconed';

const Tooltip = styled.div({
  display: 'flex',
  alignItems: 'center',
});

export const Icon = ({
  Icon,
  tooltip,
}: {
  Icon: PhosphorIcon;
  tooltip: ReactNode;
}) => {
  const {enter, leave} = useTooltip({
    placement: 'bottom',
    element: (
      <Tooltip>
        <Iconed Icon={Icon}>{tooltip}</Iconed>
      </Tooltip>
    ),
  });

  return <Iconed Icon={Icon} onMouseEnter={enter} onMouseLeave={leave} />;
};
