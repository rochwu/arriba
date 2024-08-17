import {Lightning, Skull, Stairs} from 'phosphor-solid-js';
import {Show, type Component} from 'solid-js';
import {styled} from 'solid-styled-components';

import {Absolute} from '../../Absolute';
import type {Effect} from '../../store';

import {Type} from './Type';

const Position = styled(Absolute)({
  bottom: '-4px',
  minWidth: '100%',
  justifySelf: 'center',
});

export const Types: Component<{effect: Effect}> = (props) => {
  const effect = () => props.effect;

  const shouldShow = () => effect().instant || effect().opponents;

  return (
    <Show when={shouldShow()}>
      <Position>
        <Show when={effect().instant}>
          <Type Icon={Lightning} tooltip="happens instantly" />
        </Show>
        <Show when={effect().opponents}>
          <Type Icon={Skull} tooltip="die lose, die dies" />
        </Show>
        <Show when={effect().opponents}>
          <Type Icon={Stairs} tooltip="busy 'til it's over" />
        </Show>
      </Position>
    </Show>
  );
};
