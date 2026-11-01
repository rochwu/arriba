import {useStore as useZustandStore} from 'zustand';
import {createStore} from 'zustand/vanilla';

import {initialValue} from './initialValue';
import type {State} from './types';

// Plain JS store: read, write and subscribe outside React
export const store = createStore<State>()(() => initialValue);

// React binding: re-renders when the selected slice changes
export const useStore = <T>(selector: (state: State) => T): T =>
  useZustandStore(store, selector);
