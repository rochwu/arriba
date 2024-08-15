import {Match, Switch, type Component} from 'solid-js';

import {Effects} from '../constants';
import type {EffectId} from '../store';

import {Duel} from './Duel';
import {Generic} from './Generic';

export const Effect: Component<{identifier: EffectId}> = (props) => {
  return (
    <Switch fallback={<Generic identifier={props.identifier} />}>
      <Match when={props.identifier === Effects.Duel}>
        <Duel />
      </Match>
    </Switch>
  );
};
