import {createStore} from 'solid-js/store';

import {initialValue} from './initialValue';
import {State} from './types';

export const [store, setStore] = createStore<State>(initialValue);
