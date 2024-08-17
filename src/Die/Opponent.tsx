import type {Component} from 'solid-js';
import {styled} from 'solid-styled-components';

import {vars} from '@arriba/css';
import {useTooltip} from '@arriba/tooltip';

import type {DieId} from '../store';
import {useDie} from '../useDie';

import {DieLike} from './DieLike';
import {Info} from './Info';
import {Name} from './Name';
import {Roll} from './Roll';
import {Value} from './Value';

const Container = styled(DieLike)({
  boxShadow: vars.boxShadow,
});

export const Opponent: Component<{id: DieId}> = (props) => {
  const {die, value} = useDie(props.id);

  const {enter, leave} = useTooltip({
    element: <Info die={die} />,
  });

  return (
    <Container data-die={props.id} onMouseEnter={enter} onMouseLeave={leave}>
      <Roll>{die().roll}</Roll>
      <Value>{value()}</Value>
      <Name
        style={{
          'background-color': 'black',
          color: 'white',
        }}
      >
        {die().name}
      </Name>
    </Container>
  );
};
