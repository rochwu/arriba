import {vars} from '@arriba/css';
import {DragOverlay, useDndContext} from '@dnd-kit/core';
import styled from '@emotion/styled';

import type {DieId} from '@/store';
import {useDie} from '@/useDie';

import {DieLike} from './DieLike';
import {Name} from './Name';
import {Roll} from './Roll';
import {Value} from './Value';

const Die = styled(DieLike)({
  opacity: vars.die.ghost.opacity,
  cursor: 'grabbing',
});

const Dragged = ({id}: {id: DieId}) => {
  const {die, value} = useDie(id);

  return (
    <Die>
      <Roll>{die.roll}</Roll>
      <Value>{value}</Value>
      <Name>{die.name}</Name>
    </Die>
  );
};

export const Ghost = () => {
  const {active} = useDndContext();

  return (
    <DragOverlay dropAnimation={null}>
      {active ? <Dragged id={String(active.id)} /> : null}
    </DragOverlay>
  );
};
