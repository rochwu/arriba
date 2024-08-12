import {createDraggable, createDroppable} from '@thisbeyond/solid-dnd';
import {Accessor, Component, createEffect, createMemo} from 'solid-js';
import {styled} from 'solid-styled-components';
import {Die as DieType, DieId, store} from '../store';
import {Base} from './Base';
import {Name} from './Name';
import {Face} from './Face';

const Container = styled(Base)({
  backgroundColor: 'white',
  borderColor: 'white',
  borderStyle: 'solid',
});

const Content = styled.div({
  display: 'grid',
  placeContent: 'center',
  position: 'relative',
  width: 'inherit',
  aspectRatio: 'inherit',
});

const View: Component<{identifier: DieId}> = ({identifier}) => {
  const die = createMemo(() => store.dieById[identifier]);

  return (
    <>
      {die().id}
      <Face die={die} />
      <Name die={die} />
    </>
  );
};

export const Die: Component<{identifier: DieId}> = ({identifier}) => {
  const draggable = createDraggable(identifier);
  const droppable = createDroppable(identifier, {type: 'die'});

  return (
    <Container
      ref={draggable}
      data-die={identifier}
      style={{cursor: draggable.isActiveDraggable ? 'grabbing' : 'grab'}}
    >
      <Content ref={droppable}>
        <View identifier={identifier} />
      </Content>
    </Container>
  );
};
