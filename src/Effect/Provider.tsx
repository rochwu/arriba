import type {JSX} from 'solid-js';
import {createContext, useContext, type Component} from 'solid-js';

import type {EffectId} from '../store';
import {store, type Effect} from '../store';

const Context = createContext<Effect>(undefined as never as Effect);

export const useEffectContext = () => {
  return useContext(Context);
};

export const Provider: Component<{effect: EffectId; children: JSX.Element}> = (
  props,
) => {
  const effect = () => store.effectById[props.effect];

  return <Context.Provider value={effect()}>{props.children}</Context.Provider>;
};
