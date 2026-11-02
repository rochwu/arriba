import {vars} from '@arriba/css';
import {useTooltip} from '@arriba/tooltip';
import {useDraggable} from '@dnd-kit/core';
import styled from '@emotion/styled';

import {actions, type Destination, type DieId, useStore} from '@/store';
import {destinationStyles, useDestination} from '@/useDestination';
import {useDie} from '@/useDie';

import {DieLike} from './DieLike';
import {Info} from './Info';
import {Name} from './Name';
import {NoticeMe} from './NoticeMe';
import {Roll} from './Roll';
import {Value} from './Value';

const {lift, shadow} = vars.die.picked;

const Container = styled(DieLike)({
  cursor: 'grab',
  boxShadow: vars.boxShadow,
  ...destinationStyles,
  // A container paints its own background under everything it holds, so the
  // face moves to a layer to let the shadow sit half behind it
  '&[data-picked=true]': {
    backgroundColor: 'transparent',
    isolation: 'isolate',
    transform: `translateY(calc(-1 * ${lift}))`,
    '&::before': {
      content: '""',
      position: 'absolute',
      zIndex: -1,
      left: `calc((100% - ${shadow.width}) / 2 + 1px)`,
      bottom: `calc(${shadow.height} / -2 - ${lift})`,
      width: shadow.width,
      height: shadow.height,
      borderRadius: '50%',
      backgroundColor: shadow.color,
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      zIndex: -1,
      inset: 0,
      borderRadius: 'inherit',
      backgroundColor: vars.die.backgroundColor,
    },
  },
});

const Content = styled.div({
  display: 'grid',
  placeContent: 'center',
  width: vars.die.size,
  height: vars.die.size,
});

export const Die = ({id}: {id: DieId}) => {
  const draggable = useDraggable({id, data: {id}});
  const to: Destination = {type: 'die', id};
  const destination = useDestination({id, to});

  const {die, value} = useDie(id);
  const picked = useStore((state) => state.picked);

  const {enter, leave} = useTooltip({
    element: <Info die={die} />,
  });

  return (
    <Container
      ref={draggable.setNodeRef}
      {...draggable.attributes}
      {...draggable.listeners}
      data-die={id}
      data-picked={picked === id}
      data-drop={destination.verdict}
      data-over={destination.over}
      onClick={() => (picked ? actions.putDown({to}) : actions.pickUp({id}))}
      onMouseEnter={enter}
      onMouseLeave={leave}
    >
      <Content ref={destination.setNodeRef}>
        <Roll>{die.roll}</Roll>
        <NoticeMe die={die} />
        <Value>{value}</Value>
        <Name>{die.name}</Name>
      </Content>
    </Container>
  );
};
