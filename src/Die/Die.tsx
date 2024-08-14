import {createDraggable, createDroppable} from '@thisbeyond/solid-dnd';
import type {Component} from 'solid-js';
import {Show, createSignal} from 'solid-js';
import {styled} from 'solid-styled-components';

import type {DieId} from '../store';

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
  const [hovered, setHover] = createSignal(false);

  const draggable = createDraggable(props.identifier, {id: props.identifier});
  const droppable = createDroppable(props.identifier, {
    type: 'die',
    id: props.identifier,
  });

  const {die, value} = useDie(props.identifier);

  let timeout: number;

  const enter = () => {
    timeout = setTimeout(() => {
      setHover(true);
    }, 400); // default recommended
  };

  const leave = () => {
    clearTimeout(timeout);
    setHover(false);
  };

  return (
    <Container
      ref={draggable}
      data-die={props.identifier}
      onMouseEnter={enter}
      onMouseLeave={leave}
    >
      <Content ref={droppable}>
        <Roll roll={die().roll} />
        <Newborn die={die} />
        {value()}
        <Name>{die().name}</Name>
        <Show when={hovered()}>
          <Info die={die} />
        </Show>
      </Content>
    </Container>
  );
};
