import {Key, Lightning, Skull, Stairs} from 'phosphor-solid-js';
import {Show, type Component} from 'solid-js';
import {styled} from 'solid-styled-components';

import {Absolute} from '../../Absolute';
import type {Effect, Slot} from '../../store';

import {Icon} from './Icon';
import {Lock} from './Lock';

const Position = styled(Absolute)({
  bottom: '-4px',
  minWidth: '100%',
});

export const Icons: Component<{effect: Effect; slot?: Slot}> = (props) => {
  const special = () => {
    const special = props.effect.special;
    const slot = props.slot;

    return {...special, ...slot};
  };

  return (
    <Show when={special()} keyed>
      {({instant, death, turns, key, lock}) => (
        <Position>
          <Show when={instant}>
            <Icon Icon={Lightning} tooltip="happens instantly" />
          </Show>
          <Show when={death}>
            <Icon Icon={Skull} tooltip="die loses, die dies" />
          </Show>
          <Show when={turns}>
            <Icon Icon={Stairs} tooltip="busy 'til it's over" />
          </Show>
          <Show when={key}>
            <Icon Icon={Key} tooltip="unlocks" />
          </Show>
          <Show when={lock}>
            <Lock />
          </Show>
        </Position>
      )}
    </Show>
  );
};
