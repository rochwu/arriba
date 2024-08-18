import {Lightning, Skull, Stairs} from 'phosphor-solid-js';
import {Show, type Component} from 'solid-js';
import {styled} from 'solid-styled-components';

import {Absolute} from '../../Absolute';
import type {Effect} from '../../store';

import {Special} from './Special';

const Position = styled(Absolute)({
  bottom: '-4px',
  minWidth: '100%',
  justifySelf: 'center',
});

export const Specials: Component<{effect: Effect}> = (props) => {
  const special = () => {
    const special = props.effect.special;

    return special;
  };

  return (
    <Show when={special()} keyed>
      {({instant, death, turned}) => (
        <Position>
          <Show when={instant}>
            <Special Icon={Lightning} tooltip="happens instantly" />
          </Show>

          <Show when={death}>
            <Special Icon={Skull} tooltip="die loses, die dies" />
          </Show>
          <Show when={turned}>
            <Special Icon={Stairs} tooltip="busy 'til it's over" />
          </Show>
        </Position>
      )}
    </Show>
  );
};
