import type {Lightning} from 'phosphor-solid-js';
import type {JSX} from 'solid-js';
import {type Component} from 'solid-js';
import {styled} from 'solid-styled-components';

import {useTooltip} from '../../tooltip';

const Tooltip = styled.div({
  display: 'flex',
  alignItems: 'center',
});

export const Type: Component<{Icon: typeof Lightning; tooltip: JSX.Element}> = (
  props,
) => {
  const {enter, leave} = useTooltip({
    placement: 'bottom',
    element: (
      <Tooltip>
        <props.Icon size={18} weight="duotone" color="blue" />
        &nbsp;happens instantly
      </Tooltip>
    ),
  });

  return (
    <>
      <props.Icon
        size={18}
        weight="duotone"
        color="blue"
        onMouseEnter={enter}
        onMouseLeave={leave}
      />
    </>
  );
};
