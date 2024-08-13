import {createDraggable, createDroppable} from '@thisbeyond/solid-dnd';
import {Component, Show, createMemo, createSignal, splitProps} from 'solid-js';
import {styled} from 'solid-styled-components';

import {DieId, store} from '../store';

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

export const Die: Component<{identifier: DieId}> = ({identifier}) => {
  const [hovered, setHover] = createSignal(false);

  const draggable = createDraggable(identifier);
  const droppable = createDroppable(identifier, {type: 'die', id: identifier});

  const {die, value, roll} = useDie(identifier);

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
          <Info die={die} />
        </Show>
        <Newborn die={die} />
      </Content>
    </Container>
  );
};
