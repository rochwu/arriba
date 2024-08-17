import {createDraggable, createDroppable} from '@thisbeyond/solid-dnd';
import type {Component} from 'solid-js';
import {styled} from 'solid-styled-components';

import {vars} from '@arriba/css';
import {useTooltip} from '@arriba/tooltip';

import {DropType} from '../constants';
import type {DieId} from '../store';

import {DieLike} from './DieLike';
import {Info} from './Info';
import {Name} from './Name';
import {NoticeMe} from './NoticeMe';
import {Roll} from './Roll';
import {useDie} from './useDie';
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

export const Die: Component<{id: DieId}> = (props) => {
  const draggable = createDraggable(props.id, {id: props.id});
  const droppable = createDroppable(props.id, {
    type: DropType.Die,
    id: props.id,
  });

  const {die, value} = useDie(props.id);

  const {enter, leave} = useTooltip({
    element: <Info die={die} />,
  });

  return (
    <Container
      ref={(el) => {
        draggable(el);
      }}
      data-die={props.id}
      onMouseEnter={enter}
      onMouseLeave={leave}
    >
      <Content ref={droppable}>
        <Roll>{die().roll + 1}</Roll>
        <NoticeMe die={die} />
        <Value>{value()}</Value>
        <Name>{die().name}</Name>
      </Content>
    </Container>
  );
};
