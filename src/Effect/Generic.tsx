import {createDroppable} from '@thisbeyond/solid-dnd';
import type {Component} from 'solid-js';

import {DropType} from '../constants';
import type {EffectId} from '../store';

import {Card} from './Card';
import {Dice} from './Dice';
import {useEffect} from './useEffect';

export const Generic: Component<{id: EffectId}> = (props) => {
  const droppable = createDroppable(props.id, {
    type: DropType.Effect,
    id: props.id,
  });

  const {effect} = useEffect(props.id);

  return (
    <Card ref={droppable} data-effect={props.id}>
      {effect().name}
      <Dice effect={effect} />
    </Card>
  );
};
