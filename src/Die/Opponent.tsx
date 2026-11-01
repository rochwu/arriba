import {vars} from '@arriba/css';
import {useTooltip} from '@arriba/tooltip';
import styled from '@emotion/styled';

import {Color} from '@/Color';
import type {DieId} from '@/store';
import {useDie} from '@/useDie';

import {DieLike} from './DieLike';
import {Info} from './Info';
import {Name} from './Name';
import {Roll} from './Roll';
import {Value} from './Value';

const Container = styled(DieLike)({
  boxShadow: vars.boxShadow,
});

export const Opponent = ({id}: {id: DieId}) => {
  const {die, value} = useDie(id);

  const {enter, leave} = useTooltip({
    element: <Info die={die} />,
  });

  return (
    <Container data-die={id} onMouseEnter={enter} onMouseLeave={leave}>
      <Roll>{die.roll}</Roll>
      <Value>{value}</Value>
      <Color color={vars.opponent.color}>
        <Name>{die.name}</Name>
      </Color>
    </Container>
  );
};
