import {Lightning} from 'phosphor-solid-js';
import {Show, type Component} from 'solid-js';
import {styled} from 'solid-styled-components';

import {Absolute} from '../../Absolute';
import type {Effect} from '../../store';

const Position = styled(Absolute)({
  bottom: '-2px',
  width: '100%',
});

export const Type: Component<{effect: Effect}> = (prop) => {
  return (
    <Show when={prop.effect.instant}>
      <Position>
        <Lightning size={18} weight="duotone" color="blue" />
      </Position>
    </Show>
  );
};
