import {type Component} from 'solid-js';

import {Die} from '../../Die';
import type {DieId} from '../../store';

export const Opponent: Component<{id: DieId}> = (props) => {
  return <Die id={props.id} />;
};
