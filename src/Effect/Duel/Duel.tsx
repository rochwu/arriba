import {BoxingGlove} from 'phosphor-solid-js';
import {type Component} from 'solid-js';
import {styled} from 'solid-styled-components';

import {vars} from '@arriba/css';
import {useTooltip} from '@arriba/tooltip';

import {Opponent} from '../../Die';
import {Iconed} from '../../Iconed';
import type {EffectId} from '../../store';
import {Card} from '../Card';
import {Dice} from '../Dice';
import {useEffect} from '../useEffect';

const Container = styled.div({
  display: 'flex',
  gap: vars.gap,
  alignItems: 'center',
});

const Title = styled.div({
  display: 'flex',
  alignItems: 'center',
});

const common = {
  weight: 'duotone',
  style: {
    width: vars.icon.size,
    height: vars.icon.size,
  },
  color: vars.icon.color,
};

export const Duel: Component<{id: EffectId}> = (props) => {
  const {effect} = useEffect(props.id);

  const opponent = () => {
    return effect().special!.opponents![0]!;
  };

  const {enter} = useTooltip({
    element: <Iconed Icon={BoxingGlove}>fight. unlocks things</Iconed>,
  });

  return (
    <Card>
      <Title>
        <Iconed Icon={BoxingGlove} onMouseEnter={enter}>
          {effect().name}
        </Iconed>
      </Title>
      <Container>
        <Dice effect={effect} /> v <Opponent id={opponent()} />
      </Container>
    </Card>
  );
};
