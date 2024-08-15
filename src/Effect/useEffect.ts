import {createMemo} from 'solid-js';

import type {EffectId} from '../store';
import {store} from '../store';

export const useEffect = (id: EffectId) => {
  const effect = createMemo(() => store.effectById[id]);

  return {effect};
};
