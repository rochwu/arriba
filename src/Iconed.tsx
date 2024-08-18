import type {Lightning} from 'phosphor-solid-js';
import {Show, splitProps, type Component, type JSX} from 'solid-js';

import {vars} from '@arriba/css';

import {Flex} from './Flex';

const common = {
  style: {
    width: vars.slot.special.size,
    height: vars.slot.special.size,
  },
  weight: 'duotone',
  color: vars.slot.special.color,
};

export const Iconed: Component<
  {Icon: typeof Lightning} & JSX.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const [_, spread] = splitProps(props, ['Icon', 'children']);

  const icon = () => <props.Icon {...common} {...spread} />;

  return (
    <Show when={props.children} fallback={icon()}>
      <Flex>
        {icon()}
        &nbsp;
        {props.children}
      </Flex>
    </Show>
  );
};
