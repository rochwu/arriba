import {Lightning} from 'phosphor-solid-js';
import {Show, type Component} from 'solid-js';
import {styled} from 'solid-styled-components';

import {Absolute} from '../../Absolute';
import type {Effect} from '../../store';

import {Type} from './Type';

const Position = styled(Absolute)({
  bottom: '-2px',
  width: '100%',
});

export const Types: Component<{effect: Effect}> = (props) => {
  const shouldShow = () => props.effect.instant;

  return (
    <Show when={shouldShow()}>
      <Position>
        <Type Icon={Lightning} tooltip="happens instantly" />
      </Position>
    </Show>
  );
};
