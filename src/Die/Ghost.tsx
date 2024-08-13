import {DragOverlay} from '@thisbeyond/solid-dnd';
import {Component} from 'solid-js';
import {styled} from 'solid-styled-components';

import {DieLike} from './DieLike';
import {Name} from './Name';
import {Roll} from './Roll';
import {useDie} from './useDie';

const Die = styled(DieLike)({
  opacity: '0.5',
  cursor: 'grabbing',
});

export const Ghost: Component = () => {
  return (
    <DragOverlay>
      {(draggable) => {
        const {die, value} = useDie(draggable!.id.toString());

        return (
          <Die>
            {value()}
            <Roll roll={die().roll} />
            <Name>{die().name}</Name>
          </Die>
        );
      }}
    </DragOverlay>
  );
};
