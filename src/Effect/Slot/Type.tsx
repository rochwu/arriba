import type {IconProps, Lightning} from 'phosphor-solid-js';
import type {JSX} from 'solid-js';
import {type Component} from 'solid-js';
import {styled} from 'solid-styled-components';

import {vars} from '@arriba/css';
import {useTooltip} from '@arriba/tooltip';

const Tooltip = styled.div({
  display: 'flex',
  alignItems: 'center',
});

export const Type: Component<{Icon: typeof Lightning; tooltip: JSX.Element}> = (
  props,
) => {
  const common: IconProps = {
    // Couldn't pass CSS vars into `size` so I had to inline inject it
    style: {
      width: vars.slot.type.size,
      height: vars.slot.type.size,
    },
    weight: 'duotone',
    color: vars.slot.type.color,
  };

  const {enter, leave} = useTooltip({
    placement: 'bottom',
    element: (
      <Tooltip>
        <props.Icon {...common} />
        &nbsp;{props.tooltip}
      </Tooltip>
    ),
  });

  return <props.Icon {...common} onMouseEnter={enter} onMouseLeave={leave} />;
};
