import type {IconProps, Lightning} from 'phosphor-solid-js';
import type {JSX} from 'solid-js';
import {type Component} from 'solid-js';
import {styled} from 'solid-styled-components';

import {useTooltip} from '@arriba/tooltip';

const Tooltip = styled.div({
  display: 'flex',
  alignItems: 'center',
});

const SIZE = 18;

export const Type: Component<{Icon: typeof Lightning; tooltip: JSX.Element}> = (
  props,
) => {
  const common: IconProps = {size: SIZE, weight: 'duotone', color: 'blue'};

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
