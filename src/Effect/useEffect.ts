import type {EffectId} from '../store';
import {store} from '../store';

export const useEffect = (id: EffectId) => {
  const effect = () => store.effectById[id];

  return {effect};
};
