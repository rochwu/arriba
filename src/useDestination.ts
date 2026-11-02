import {vars} from '@arriba/css';
import {useDroppable} from '@dnd-kit/core';

import {canPutDown, type Destination, useStore} from './store';

const {allowed, disallowed} = vars.slot;

export const destinationStyles = {
  '&[data-drop=allowed]': {cursor: 'pointer'},
  '&[data-drop=allowed]:hover': {backgroundColor: allowed},
  '&[data-drop=allowed][data-over=true]': {backgroundColor: allowed},
  '&[data-drop=blocked]:hover': {backgroundColor: disallowed},
  '&[data-drop=blocked][data-over=true]': {backgroundColor: disallowed},
  '&[data-drop=full]:hover': {backgroundColor: disallowed},
  '&[data-drop=full][data-over=true]': {backgroundColor: disallowed},
};

export const useDestination = ({id, to}: {id: string; to: Destination}) => {
  const droppable = useDroppable({id, data: to});

  const verdict = useStore((state) =>
    state.picked ? canPutDown(state, {die: state.picked, to}) : undefined,
  );

  return {setNodeRef: droppable.setNodeRef, verdict, over: droppable.isOver};
};
