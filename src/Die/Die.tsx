import {createDraggable, createDroppable} from '@thisbeyond/solid-dnd';
import {Component, Show, createMemo, createSignal, splitProps} from 'solid-js';
import {styled} from 'solid-styled-components';

import {DieId, store} from '../store';

import {DieLike} from './DieLike';
import {Faces} from './Faces';
import {Name} from './Name';
import {Roll} from './Roll';

const Container = styled(DieLike)({
  cursor: 'grab',
});

const Content = styled.div({
  display: 'grid',
  placeContent: 'center',
  position: 'relative',
  width: 'inherit',
  aspectRatio: 'inherit',
});

export const Die: Component<{identifier: DieId}> = ({identifier}) => {
  const [hovered, setHover] = createSignal(false);

  const draggable = createDraggable(identifier);
  const droppable = createDroppable(identifier, {type: 'die'});

  const die = createMemo(() => store.dieById[identifier]);
  const value = createMemo(() => {
    const {faces, roll: index} = die();

    return faces[index].value;
  });
  const roll = createMemo(() => die().roll);

  const enter = () => {
    setHover(true);
  };

  const leave = () => {
    setHover(false);
  };

  return (
    <Container
      ref={draggable}
      data-die={identifier}
      onMouseEnter={enter}
      onMouseLeave={leave}
    >
      <Content ref={droppable}>
        {value()}
        <Roll roll={roll} />
        <Name die={die} />
        <Show when={hovered()}>
          <Faces die={die} />
        </Show>
      </Content>
    </Container>
  );
};
