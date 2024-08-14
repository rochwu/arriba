import {createStore} from 'solid-js/store';

import {initialValue} from './initialValue';
import type {State} from './types';

export const [store, setStore] = createStore<State>(initialValue);
