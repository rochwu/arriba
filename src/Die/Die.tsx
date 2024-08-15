import {createDraggable, createDroppable} from '@thisbeyond/solid-dnd';
import type {Component} from 'solid-js';
import {Show} from 'solid-js';
import {Portal} from 'solid-js/web';
import {styled} from 'solid-styled-components';

import {DropType} from '../constants';
import type {DieId} from '../store';
import {useTooltip} from '../useTooltip';

import {DieLike} from './DieLike';
import {Info} from './Info';
import {Name} from './Name';
import {New} from './New';
import {Roll} from './Roll';
import {useDie} from './useDie';
import {Value} from './Value';

const Container = styled(DieLike)({
  cursor: 'grab',
});

const Content = styled.div({
  display: 'grid',
  placeContent: 'center',
  width: 'inherit',
  aspectRatio: 'inherit',
});

export const Die: Component<{id: DieId}> = (props) => {
  const draggable = createDraggable(props.id, {id: props.id});
  const droppable = createDroppable(props.id, {
    type: DropType.Die,
    id: props.id,
  });

  const {die, value} = useDie(props.id);

  const {enter, leave, hovered, container, tooltip} = useTooltip();

  return (
    <Container
      ref={(el) => {
        container(el);
        draggable(el);
      }}
      data-die={props.id}
      onMouseEnter={enter}
      onMouseLeave={leave}
    >
      <Content ref={droppable}>
        <Roll>{die().roll + 1}</Roll>
        <New die={die} />
        <Value>{value()}</Value>
        <Name>{die().name}</Name>
        <Show when={hovered()}>
          <Portal>
            <Info ref={tooltip} die={die} />
          </Portal>
        </Show>
      </Content>
    </Container>
  );
};
