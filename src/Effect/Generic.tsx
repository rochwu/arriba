import {createDroppable} from '@thisbeyond/solid-dnd';
import type {Component} from 'solid-js';

import {DropType} from '../constants';
import type {EffectId} from '../store';

import {Card} from './Card';
import {Dice} from './Dice';
import {useEffect} from './useEffect';

export const Generic: Component<{identifier: EffectId}> = (props) => {
  const droppable = createDroppable(props.identifier, {
    type: DropType.Effect,
    id: props.identifier,
  });

  const {effect} = useEffect(props.identifier);

  return (
    <Card ref={droppable} data-effect={props.identifier}>
      {effect().name}
      <Dice effect={effect} />
    </Card>
  );
};
