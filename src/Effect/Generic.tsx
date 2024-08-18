import type {Component} from 'solid-js';

import type {EffectId} from '../store';

import {Card} from './Card';
import {Slots} from './Slots';
import {useEffect} from './useEffect';

export const Generic: Component<{id: EffectId}> = (props) => {
  const {effect} = useEffect(props.id);

  return (
    <Card data-effect={props.id}>
      {effect().name}
      <Slots effect={effect()} />
    </Card>
  );
};
