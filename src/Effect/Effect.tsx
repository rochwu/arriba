import {Match, Switch, type Component} from 'solid-js';

import type {EffectId} from '../store';

import {Base} from './Base';
import {Fight} from './Fight';
import {Generic} from './Generic';
import {Provider, useEffectContext} from './Provider';

const Common = () => {
  const effect = useEffectContext();

  return (
    <Base>
      <Switch fallback={<Generic />}>
        <Match when={effect.special?.opponents}>
          <Fight />
        </Match>
      </Switch>
    </Base>
  );
};

export const Effect: Component<{id: EffectId}> = (props) => {
  return (
    <Provider effect={props.id}>
      <Common />
    </Provider>
  );
};
