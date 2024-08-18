import type {Lightning} from 'phosphor-solid-js';
import type {JSX} from 'solid-js';
import {type Component} from 'solid-js';
import {styled} from 'solid-styled-components';

import {useTooltip} from '@arriba/tooltip';

import {Iconed} from '../../Iconed';

const Tooltip = styled.div({
  display: 'flex',
  alignItems: 'center',
});

export const Special: Component<{
  Icon: typeof Lightning;
  tooltip: JSX.Element;
}> = (props) => {
  const {enter, leave} = useTooltip({
    placement: 'bottom',
    element: (
      <Tooltip>
        <Iconed Icon={props.Icon}>{props.tooltip}</Iconed>
      </Tooltip>
    ),
  });

  return <Iconed Icon={props.Icon} onMouseEnter={enter} onMouseLeave={leave} />;
};
