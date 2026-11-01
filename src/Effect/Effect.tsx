import type {EffectId} from '@/store';

import {Base} from './Base';
import {Fight} from './Fight';
import {Generic} from './Generic';
import {Provider, useEffectContext} from './Provider';

const Common = () => {
  const effect = useEffectContext();

  return <Base>{effect.special?.opponents ? <Fight /> : <Generic />}</Base>;
};

export const Effect = ({id}: {id: EffectId}) => {
  return (
    <Provider effect={id}>
      <Common />
    </Provider>
  );
};
