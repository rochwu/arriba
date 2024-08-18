import {DragOverlay} from '@thisbeyond/solid-dnd';
import type {Component} from 'solid-js';
import {styled} from 'solid-styled-components';

import {useDie} from '../useDie';

import {DieLike} from './DieLike';
import {Name} from './Name';
import {Roll} from './Roll';
import {Value} from './Value';

const Die = styled(DieLike)({
  opacity: '0.5',
  cursor: 'grabbing',
});

export const Ghost: Component = () => {
  return (
    <DragOverlay>
      {(draggable) => {
        const {die, value} = useDie(String(draggable!.id));

        return (
          <Die>
            <Roll>{die().roll}</Roll>
            <Value>{value()}</Value>
            <Name>{die().name}</Name>
          </Die>
        );
      }}
    </DragOverlay>
  );
};
