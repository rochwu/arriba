import {vars} from '@arriba/css';
import {useTooltip} from '@arriba/tooltip';
import {useDraggable, useDroppable} from '@dnd-kit/core';
import styled from '@emotion/styled';

import {DropType} from '@/constants';
import type {DieId} from '@/store';
import {useDie} from '@/useDie';

import {DieLike} from './DieLike';
import {Info} from './Info';
import {Name} from './Name';
import {NoticeMe} from './NoticeMe';
import {Roll} from './Roll';
import {Value} from './Value';

const Container = styled(DieLike)({
  cursor: 'grab',
  boxShadow: vars.boxShadow,
});

const Content = styled.div({
  display: 'grid',
  placeContent: 'center',
  width: vars.die.size,
  height: vars.die.size,
});

export const Die = ({id}: {id: DieId}) => {
  const draggable = useDraggable({id, data: {id}});
  const droppable = useDroppable({id, data: {type: DropType.Die, id}});

  const {die, value} = useDie(id);

  const {enter, leave} = useTooltip({
    element: <Info die={die} />,
  });

  return (
    <Container
      ref={draggable.setNodeRef}
      {...draggable.attributes}
      {...draggable.listeners}
      data-die={id}
      onMouseEnter={enter}
      onMouseLeave={leave}
    >
      <Content ref={droppable.setNodeRef}>
        <Roll>{die.roll}</Roll>
        <NoticeMe die={die} />
        <Value>{value}</Value>
        <Name>{die.name}</Name>
      </Content>
    </Container>
  );
};
