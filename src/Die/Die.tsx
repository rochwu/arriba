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
import {Newborn} from './Newborn';
import {Roll} from './Roll';
import {useDie} from './useDie';

const Container = styled(DieLike)({
  cursor: 'grab',
});

const Content = styled.div({
  display: 'grid',
  placeContent: 'center',
  width: 'inherit',
  aspectRatio: 'inherit',
});

export const Die: Component<{identifier: DieId}> = (props) => {
  const draggable = createDraggable(props.identifier, {id: props.identifier});
  const droppable = createDroppable(props.identifier, {
    type: DropType.Die,
    id: props.identifier,
  });

  const {die, value} = useDie(props.identifier);

  const {enter, leave, hovered, container, tooltip} = useTooltip();

  return (
    <Container
      ref={(el) => {
        container(el);
        draggable(el);
      }}
      data-die={props.identifier}
      onMouseEnter={enter}
      onMouseLeave={leave}
    >
      <Content ref={droppable}>
        <Roll>{die().roll + 1}</Roll>
        <Newborn die={die} />
        {value()}
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
