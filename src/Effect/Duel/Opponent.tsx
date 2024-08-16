import {type Component} from 'solid-js';

import {Die} from '../../Die';
import type {Effect} from '../../store';

export const Opponent: Component<{effect: Effect}> = (props) => {
  const opponent = () => props.effect.opponents![0];

  return <Die id={opponent()} />;
};
