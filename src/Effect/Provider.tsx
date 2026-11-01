import type {ReactNode} from 'react';
import {createContext, useContext} from 'react';

import type {Effect, EffectId} from '../store';
import {useStore} from '../store';

const Context = createContext<EffectId>(undefined as never as EffectId);

export const useEffectContext = (): Effect => {
  const id = useContext(Context);

  return useStore((state) => state.effectById[id]);
};

export const Provider = ({
  effect,
  children,
}: {
  effect: EffectId;
  children: ReactNode;
}) => {
  return <Context.Provider value={effect}>{children}</Context.Provider>;
};
