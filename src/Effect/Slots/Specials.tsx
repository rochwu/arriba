import {Key, Lightning, Skull, Stairs} from 'phosphor-solid-js';
import {Show, type Component} from 'solid-js';
import {styled} from 'solid-styled-components';

import {Absolute} from '../../Absolute';
import type {Effect, Slot} from '../../store';

import {Lock} from './Lock';
import {Special} from './Special';

const Position = styled(Absolute)({
  bottom: '-4px',
  minWidth: '100%',
});

export const Specials: Component<{effect: Effect; slot?: Slot}> = (props) => {
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
            <Special Icon={Lightning} tooltip="happens instantly" />
          </Show>
          <Show when={death}>
            <Special Icon={Skull} tooltip="die loses, die dies" />
          </Show>
          <Show when={turns}>
            <Special Icon={Stairs} tooltip="busy 'til it's over" />
          </Show>
          <Show when={key}>
            <Special Icon={Key} tooltip="unlocks" />
          </Show>
          <Show when={lock}>
            <Lock effect={props.effect} />
          </Show>
        </Position>
      )}
    </Show>
  );
};
