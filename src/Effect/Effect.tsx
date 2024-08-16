import {Match, Switch, type Component} from 'solid-js';

import {Effects} from '../constants';
import type {EffectId} from '../store';

import {Duel} from './Duel';
import {Generic} from './Generic';

export const Effect: Component<{id: EffectId}> = (props) => {
  return (
    <Switch fallback={<Generic id={props.id} />}>
      <Match when={props.id === Effects.Duel}>
        <Duel />
      </Match>
    </Switch>
  );
};
