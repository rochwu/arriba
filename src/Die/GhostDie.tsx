import {DragOverlay} from '@thisbeyond/solid-dnd';
import {Component, createMemo} from 'solid-js';
import {styled} from 'solid-styled-components';

import {store} from '../store';

import {DieLike} from './DieLike';
import {Name} from './Name';
import {Roll} from './Roll';

const Die = styled(DieLike)({
  opacity: '0.5',
  cursor: 'grabbing',
});

export const GhostDie: Component = () => {
  return (
    <DragOverlay>
      {(draggable) => {
        const {id} = draggable!;

        const die = createMemo(() => store.dieById[id]);
        const value = createMemo(() => {
          const {faces, roll: index} = die();

          return faces[index].value;
        });
        const roll = createMemo(() => die().roll);

        return (
          <Die>
            {value()}
            <Roll roll={roll} />
            <Name die={die} />
          </Die>
        );
      }}
    </DragOverlay>
  );
};
